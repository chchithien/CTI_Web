# Spam Detection System

A full-stack web application that uses machine learning to detect spam emails with real-time analysis and CSV batch processing capabilities.

## 🚀 Features

### Frontend (React)
- **Dual Input Modes**: Paste single email text or upload CSV files for batch processing
- **Real-time Analysis**: Instant spam detection with confidence scores
- **Interactive Visualizations**: Chart.js graphs showing prediction probabilities
- **CSV Batch Processing**: Analyze multiple emails at once with detailed statistics
- **Responsive Design**: Clean, modern UI that works on all devices

### Backend (Flask)
- **Machine Learning Models**: Ensemble of Logistic Regression, Random Forest, and Naive Bayes
- **RESTful API**: JSON endpoints for single and batch predictions
- **File Processing**: CSV upload with automatic column detection
- **Results Export**: Download processed results as CSV files
- **CORS Enabled**: Seamless frontend-backend communication

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **CSS3** - Styling and responsive design

### Backend
- **Flask** - Python web framework
- **scikit-learn** - Machine learning models
- **pandas** - Data processing
- **NumPy/SciPy** - Numerical computations

### Machine Learning
- **Models**: Logistic Regression, Random Forest, Naive Bayes
- **Training Data**: 30,000+ real and phishing emails
- **Features**: TF-IDF vectorization + text statistics
- **Preprocessing**: Text cleaning, URL removal, case normalization

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- pip package manager

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend