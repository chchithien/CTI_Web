from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pickle
import re
import pandas as pd
from scipy import sparse
import numpy as np
import io
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for frontend communication

# Configure upload settings
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create uploads folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the trained model and preprocessing tools
try:
    with open('tfidf_vectoriser.pkl', 'rb') as f:
        tfidf = pickle.load(f)
    
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    
    with open('best_model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    print("✓ Model and preprocessors loaded successfully")
except Exception as e:
    print(f"✗ Error loading model: {e}")
    print("Make sure you have: best_model.pkl, tfidf_vectoriser.pkl, scaler.pkl")

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def clean_text(text):
    """Clean and preprocess email text"""
    if pd.isna(text) or text == "":
        return ""
    
    text = str(text).lower()
    text = re.sub(r'http\S+|www\S+', '', text)  # Remove URLs
    text = re.sub(r'\\n', ' ', text)  # Replace \n with space
    text = re.sub(r'[^a-zA-Z0-9\s.,!?]', '', text)  # Remove special chars
    text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces
    return text

def extract_features(text, original_text):
    """Extract features from email text"""
    # TF-IDF features
    X_tfidf = tfidf.transform([text])
    
    # Numeric features - NO SCALING (to match training)
    text_length = len(text)
    word_count = len(text.split())
    uppercase_ratio = sum(1 for c in original_text if c.isupper()) / max(len(original_text), 1)
    
    numeric_features = np.array([[text_length, word_count, uppercase_ratio]])
    
    # Combine features (without scaling)
    X = sparse.hstack([X_tfidf, numeric_features])
    
    return X

def predict_single_email(email_text):
    """Predict if a single email is spam"""
    cleaned_text = clean_text(email_text)
    
    if cleaned_text == "":
        return None
    
    X = extract_features(cleaned_text, email_text)
    probability = model.predict_proba(X)[0]


    classes = list(model.classes_)
    print("Model classes order:", classes)

    if 0 in classes and 1 in classes:
        spam_index = classes.index(0) 
        ham_index = classes.index(1)   
    else:
        spam_index, ham_index = 1, 0 

    spam_prob = float(probability[spam_index])
    ham_prob = float(probability[ham_index])

    final_prediction = 'spam' if spam_prob > ham_prob else 'ham'
    final_confidence = max(spam_prob, ham_prob)
    
    return {
        'prediction': final_prediction,
        'confidence': final_confidence,
        'probabilities': {
            'ham': ham_prob,
            'spam': spam_prob
        }
    }


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': 'model' in globals()
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Predict if email is spam or ham"""
    try:
        # Get email text from request
        data = request.get_json()
        
        if not data or 'email' not in data:
            return jsonify({
                'error': 'Missing email field in request'
            }), 400
        
        email_text = data['email']
        
        if not email_text or email_text.strip() == "":
            return jsonify({
                'error': 'Email text cannot be empty'
            }), 400
        
        # Predict
        result = predict_single_email(email_text)
        
        if result is None:
            return jsonify({
                'error': 'Email contains no valid text after cleaning'
            }), 400
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'error': f'Prediction failed: {str(e)}'
        }), 500

@app.route('/predict-csv', methods=['POST'])
def predict_csv():
    """Predict spam for all emails in a CSV file (no label column required)"""
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Only CSV files are allowed'}), 400
        
        df = pd.read_csv(file)
        
        df.columns = df.columns.str.strip().str.lower()
        print(f"CSV columns found: {df.columns.tolist()}")
        
        text_col = None
        subject_col = None
        
        for col in ['message', 'text', 'content', 'body', 'email']:
            if col in df.columns:
                text_col = col
                break
        
        for col in ['subject', 'title']:
            if col in df.columns:
                subject_col = col
                break
        
        if text_col is None:
            return jsonify({
                'error': f'Could not find message column. Available columns: {df.columns.tolist()}'
            }), 400
        
        print(f"Using columns - Message: '{text_col}', Subject: '{subject_col}'")
        
        # Predict for each row
        predictions = []
        spam_count = 0
        ham_count = 0
        
        for idx, row in df.iterrows():
            # Combine subject + message
            email_text = ""
            if subject_col and pd.notna(row[subject_col]):
                email_text += str(row[subject_col]) + " "
            email_text += str(row[text_col])
            
            result = predict_single_email(email_text)
            
            if result:
                predictions.append({
                    'row': idx + 1,
                    'text_preview': email_text[:100] + '...' if len(email_text) > 100 else email_text,
                    'prediction': result['prediction'],
                    'confidence': round(result['confidence'], 4)
                })
                
                if result['prediction'] == 'spam':
                    spam_count += 1
                else:
                    ham_count += 1
        
       
        results_df = df.copy()
        results_df['predicted_label'] = [p['prediction'] for p in predictions]
        results_df['confidence'] = [p['confidence'] for p in predictions]
        
        output_filename = 'spam_detection_results.csv'
        output_path = os.path.join(app.config['UPLOAD_FOLDER'], output_filename)
        results_df.to_csv(output_path, index=False)
        
  
        response_data = {
            'success': True,
            'total_emails': len(predictions),
            'spam_count': spam_count,
            'ham_count': ham_count,
            'spam_percentage': round((spam_count / len(predictions)) * 100, 2) if predictions else 0,
            'predictions': predictions[:10],  
            'download_url': f'/download/{output_filename}',
            'message': f'Processed {len(predictions)} emails — {spam_count} spam, {ham_count} ham.'
        }
        
        return jsonify(response_data)
    
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'CSV processing failed: {str(e)}'}), 500

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    """Download the results CSV file"""
    try:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(file_path):
            return send_file(file_path, as_attachment=True, download_name=filename)
        else:
            return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    """Root endpoint"""
    return jsonify({
        'message': 'Spam Detection API',
        'endpoints': {
            'POST /predict': 'Predict if a single email is spam (JSON: {"email": "text"})',
            'POST /predict-csv': 'Predict spam for all emails in CSV file (Form data with file)',
            'GET /download/<filename>': 'Download results CSV',
            'GET /health': 'Check API health'
        }
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)