Spam Detection System
A full-stack web application that uses machine learning to detect spam emails with real-time analysis and CSV batch processing capabilities.

🚀 Features
Frontend (React)
Dual Input Modes: Paste single email text or upload CSV files for batch processing

Real-time Analysis: Instant spam detection with confidence scores

Interactive Visualizations: Chart.js graphs showing prediction probabilities

CSV Batch Processing: Analyze multiple emails at once with detailed statistics

Responsive Design: Clean, modern UI that works on all devices

Backend (Flask)
Machine Learning Models: Ensemble of Logistic Regression, Random Forest, and Naive Bayes

RESTful API: JSON endpoints for single and batch predictions

File Processing: CSV upload with automatic column detection

Results Export: Download processed results as CSV files

CORS Enabled: Seamless frontend-backend communication

🛠️ Technology Stack
Frontend
React - UI framework

Chart.js - Data visualization

Axios - HTTP client

CSS3 - Styling and responsive design

Backend
Flask - Python web framework

scikit-learn - Machine learning models

pandas - Data processing

NumPy/SciPy - Numerical computations

Machine Learning
Models: Logistic Regression, Random Forest, Naive Bayes

Training Data: 30,000+ real and phishing emails

Features: TF-IDF vectorization + text statistics

Preprocessing: Text cleaning, URL removal, case normalization

📦 Installation
Prerequisites
Node.js (v14 or higher)

Python 3.8+

pip package manager

Backend Setup
Navigate to backend directory:

bash
cd backend
Create virtual environment:

bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install Python dependencies:

bash
pip install flask flask-cors scikit-learn pandas numpy scipy
Place model files in root directory:

best_model.pkl - Trained ensemble model

tfidf_vectoriser.pkl - TF-IDF vectorizer

scaler.pkl - Feature scaler

Start Flask server:

bash
python app.py
Server runs on http://127.0.0.1:5001

Frontend Setup
Navigate to frontend directory:

bash
cd frontend
Install dependencies:

bash
npm install
Start development server:

bash
npm start
Application runs on http://localhost:3000

📖 Usage
Single Email Analysis
Select "Paste text" mode

Enter email details:

Title (optional)

Message body (required)

Click "Check Spam"

View results:

Spam/Ham classification

Confidence percentage

Probability breakdown

Interactive chart

CSV Batch Analysis
Select "Upload doc" mode

Prepare CSV file with columns:

text
Message ID, Subject, Message, Spam/Ham (optional)
Upload CSV file

Click "Analyze CSV"

View batch results:

Total emails processed

Spam/Ham counts and percentages

Accuracy (if labels provided)

Download full results

🎯 API Endpoints
POST /predict
Purpose: Single email spam detection

Input: {"email": "email text content"}

Output: Prediction with confidence scores

POST /predict-csv
Purpose: Batch CSV processing

Input: Form data with CSV file

Output: Statistics and download link

GET /download/<filename>
Purpose: Download processed results

Output: CSV file with predictions

GET /health
Purpose: API health check

Output: Service status

📊 Model Performance
Training Data: 30,000+ emails

Feature Engineering: TF-IDF + text statistics

Ensemble Approach: Combines multiple algorithms

Accuracy: High detection rate with minimal false positives

🎨 UI Components
InputForm.js
Mode switching between text paste and CSV upload

Real-time character counting

File validation and error handling

ResultCard.js
Single email results display

CSV batch analysis summary

Interactive download buttons

ChartView.js
Probability visualization using Chart.js

Responsive bar charts

Color-coded spam/ham indicators

🔧 Configuration
Environment Variables
API_URL: Backend server URL (default: http://127.0.0.1:5001)

Upload folder path for temporary files

File Requirements
CSV Format: Must include message content column

File Size: Maximum 16MB

Supported Types: .csv only

👥 Team
Project Manager: Valerian Raimon

Machine Learning Engineer: Chi Thien Ly

UI/UX Designer: Jinxi Chen

📝 License
This project is developed for educational and research purposes in spam detection technology.

🆘 Troubleshooting
Common Issues
Connection Error: Ensure Flask server is running on port 5001

Model Loading: Verify all .pkl files are in correct location

CSV Upload: Check column names match expected format

CORS Errors: Confirm Flask-CORS is properly installed

Getting Help
Check browser console for detailed error messages and verify both frontend and backend services are running.

