# CTI_Web
Project Title
CTIP's Spam Detection

Description
This is a React-based web application for detecting spam emails using advanced AI models. The tool allows users to paste suspicious email content or upload CSV files for batch analysis. It leverages machine learning algorithms (Logistic Regression, Random Forest, and Naive Bayes) trained on over 30,000 real and phishing emails to provide accurate predictions, including confidence scores and probabilities. The app features a user-friendly interface with visualization charts and supports both single email checks and bulk CSV processing.

Features
Single Email Analysis: Paste email title and body for instant spam detection.
CSV Upload: Upload CSV files with columns like Message ID, Subject, Message, and optional Spam/Ham labels for batch processing.
AI Models: Powered by Logistic Regression, Random Forest, and Naive Bayes for multi-layered analysis (subject, sender, tone, links).
Visualization: Displays prediction results with bar charts showing spam probabilities.
Responsive Design: Mobile-friendly UI with adaptive layouts.
Error Handling: Clear error messages for invalid inputs or server issues.
Download Results: For CSV uploads, download full prediction results as a new CSV.
Technologies Used
Frontend: React.js, CSS (custom styles), Axios for API calls, Chart.js for visualizations.
Backend: Flask (Python), running on http://127.0.0.1:5001.
Machine Learning: Scikit-learn (for models), Pandas (for CSV handling).
Other: Node.js (for React development), HTML5, JavaScript.
Installation
Clone the Repository:

Run git clone <repository-url> to download the project.
Backend Setup:

Navigate to the backend directory (assuming it's separate; if not, ensure Flask is set up).
Install Python dependencies: pip install flask scikit-learn pandas.
Start the Flask server: python app.py (ensure it runs on port 5001).
Frontend Setup:

Navigate to the frontend directory (e.g., MultipleFiles).
Install Node.js dependencies: npm install.
Start the React app: npm start.
The app will run on http://localhost:3000 by default.
Environment:

Ensure the backend is running before using the frontend.
For CSV uploads, ensure the CSV format matches: Message ID, Subject, Message (optional: Spam/Ham).
Usage
Single Email Check:

Select "Paste text" mode.
Enter the email title and message body.
Click "Check Spam" to get results, including prediction, confidence, and probabilities.
CSV Upload:

Select "Upload doc" mode.
Upload a CSV file with the required columns.
Click "Analyze CSV" to process and view statistics (total emails, spam count, accuracy).
Download the full results CSV.
Viewing Results:

Results appear in the right column with a badge (Spam/Legitimate), details, and a bar chart.
For CSV, see overall stats and a preview of the first 10 predictions.
API Endpoints
POST /predict: For single email analysis. Payload: { "email": "full email content" }. Response: { "prediction": "spam/ham", "confidence": 0.95, "probabilities": { "spam": 0.95, "ham": 0.05 } }.
POST /predict-csv: For CSV upload. Payload: FormData with "file" key. Response: { "total_emails": 100, "spam_count": 20, "ham_count": 80, "spam_percentage": 20, "accuracy": 85, "predictions": [...], "download_url": "/download/results.csv" }.
Screenshots/Demos
Input Form: Shows the paste/upload interface with mode switch.
Results: Displays prediction badge, details, and chart.
Instructions: Includes demo images (/demo.png, /uploadDemo.png, /demoAI.png) for user guidance.
Team
Project Manager: Valerian Raimon
Machine Learning Engineer: Chi Thien Ly
UI/UX Designer: Jinxi Chen
Contributing
Fork the repository and submit pull requests.
Report issues via GitHub Issues.
Ensure code follows React best practices and includes tests for new features.
License
This project is licensed under the MIT License. See LICENSE file for details.

Remote Agent

Select Models
