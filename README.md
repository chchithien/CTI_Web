# 📧 Email Detection Machine Learning Web App

This project is a **Machine Learning-based web application** that detects whether an email is **spam or legitimate**.  
It integrates a trained ML model with a **FastAPI backend** and a simple **frontend interface**, allowing users to paste email content and instantly receive a prediction.

---

## 🚀 Project Overview

The goal of this project is to build an end-to-end system that:
1. Preprocesses and cleans email text data.
2. Extracts key features using **TF-IDF vectorization** and text-based metrics.
3. Trains a machine learning model to classify emails.
4. Deploys the model using a FastAPI REST API.
5. Provides a simple web interface for user interaction.

---

## 🧠 Machine Learning Workflow

1. **Data Preprocessing**
   - Cleaned email text (removed URLs, symbols, numbers, and extra spaces).
   - Converted all text to lowercase.
   - Extracted numeric features:  
     - `text_length`  
     - `word_count`  
     - `uppercase_ratio`

2. **Feature Extraction**
   - Used **TF-IDF (Term Frequency–Inverse Document Frequency)** to convert text into numerical vectors.
   - Combined TF-IDF features with numeric features for better accuracy.

3. **Model Training**
   - Trained models using algorithms such as:
     - Naive Bayes
     - Random Forest
     - Logistic Regression  
   - Evaluated using accuracy, precision, recall, and F1-score.
   - Saved the best-performing model with `pickle` for deployment.

---

## ⚙️ Backend API (FastAPI)

The backend was built with **FastAPI** to provide a RESTful API endpoint for predictions.

### **Endpoint**
`POST /predict`

**Request Body:**
```json
{
  "email_text": "Congratulations! You have won a free iPhone. Click here to claim your prize."
}
```

**Response:**
```json
{
  "prediction": "Spam"
}
```

### **Run the API locally**
```bash
uvicorn app:app --reload
```

Then open your browser at:  
👉 http://127.0.0.1:8000/docs for the interactive API documentation.

---

## 🧩 Project Structure

```
project/
│
├── app.py                # FastAPI backend
├── model.pkl             # Trained ML model
├── tfidf.pkl             # TF-IDF vectorizer
├── scaler.pkl            # Scaler for numeric features (if used)
├── requirements.txt      # Project dependencies
├── test_request.py       # Script to test the API
├── frontend/             # (Optional) Frontend HTML/JS files
└── ml_model_cti.ipynb    # Jupyter notebook for model training
```

---

## 📦 Installation

### **1. Clone the repository**
```bash
git clone https://github.com/yourusername/email-detection-app.git
cd email-detection-app
```

### **2. Create a virtual environment**
```bash
python -m venv venv
source venv/bin/activate   # On macOS/Linux
venv\Scripts\activate    # On Windows
```

### **3. Install dependencies**
```bash
pip install -r requirements.txt
```

### **4. Run the FastAPI app**
```bash
uvicorn app:app --reload
```

Visit `http://127.0.0.1:8000/docs` to test your API interactively.

---

## 💡 Future Improvements
- Add a database for storing email logs.
- Deploy the model and API to AWS or Render.
- Build a modern React frontend for better UI.

---

## 👩‍💻 Author
**Chi Thien Ly**  
Swinburne University of Technology  
2025
