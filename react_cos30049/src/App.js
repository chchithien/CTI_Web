import React, { useState, useEffect } from "react";
import InputForm from "./InputForm";
import ResultCard from "./ResultCard";
import ChartView from "./ChartView";
import { FaBars } from "react-icons/fa";
import "./App.css";

export default function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".sidebar") && !e.target.closest(".hamburger")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleNewResult = (newResult) => {
    setResult(newResult);
    setMenuOpen(false);
    setHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newResult.title || "Untitled",
        prediction: newResult.prediction,
        confidence: newResult.confidence,
      },
    ]);
  };

  const handleSelectHistory = (item) => {
    setResult(item);
    setMenuOpen(false);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <button
          className="hamburger"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          <FaBars />
        </button>
        <h1>CTIP's Spam Detection</h1>
      </header>

      {/* ✅ Intro Section */}
      <section className="intro-section">
        <h2>AI Spam Detector</h2>
        <p>
          Paste or enter your text below into our AI Detector to get an instant
          AI detection report.
        </p>
      </section>

      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h3>Detection History</h3>
        {history.length === 0 ? (
          <p className="empty">No messages checked yet.</p>
        ) : (
          <ul>
            {history.map((item) => (
              <li key={item.id} onClick={() => handleSelectHistory(item)}>
                <strong>{item.title}</strong>
                <span>
                  {item.prediction} ({(item.confidence * 100).toFixed(1)}%)
                </span>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Main */}
      <main className="app-main">
        <div className="app-column">
          <InputForm onResult={handleNewResult} />
        </div>

        <div className="app-column">
          <ResultCard result={result} />

          <div className="chart-container">
            <h3>Spam Probability</h3>
            {result && <ChartView result={result} />}
          </div>
        </div>
      </main>
      <a href="#instruction" className="learn-link">
      Click here to learn how to use our AI detector.
      </a>

      <a href="#AIintroduction" className="learn-link">
      Click here to learn how our AI detector uses AI      
      </a>

      <section className="intro-section">
        <p>
        AI Powered by <strong>Logistic Regression, Random Forest, Naive Bayes</strong>
        </p>
      </section>

      
      


      <footer className="bottom-divider"></footer>


      <div>        
      <section id="instruction" className="instru-section">
        <div className="instru-text">
          <h2>Instruction(input)</h2>
          <ol>
            <li>
             <strong className="instru-strong">Copy the email:</strong> Open the suspicious email and copy both its
              <strong > subject</strong> and <strong>entire message body</strong> (including sender info,
              links, and attachment names if any).
            </li>
            <li>
              <strong className="instru-strong">Paste into the input box:</strong> Paste everything into the text area on the left.
              Make sure to include all visible content so the system can analyze it fully.
            </li>
            <li>
              <strong className="instru-strong">Click “Submit”:</strong> Press the <strong>Submit</strong> button to start the
              analysis. The system will scan for signs of phishing, fake links, urgent tone, or data
              requests.
            </li>
            <li>
              <strong className="instru-strong">View results on the right:</strong>
              <ul>
                <li>
                  <strong>Overall judgment</strong> — e.g. “Highly Suspicious”, “Suspicious”, “Low Risk”, or
                  “No Risk Detected”.
                </li>
                <li>
                  <strong>Suspicious points list</strong> — detailed findings such as fake sender, urgent
                  wording, suspicious URLs, or requests for sensitive info.
                </li>
                <li>
                  <strong>Visualization chart</strong> — a chart showing the score distribution for various
                  risk factors (e.g., phishing intent, link risk, urgency, attachment danger, spoofed
                  address).
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="instru-image">
          <img src="/demo.png" alt="Instruction demo" />
        </div>
        </section>


      </div>

      <div>        
      <section id="instruction" className="instru-section">
        <div className="instru-text">
          <h2>Instruction (CSV Upload)</h2>
          <ol>
            <li>
              <strong className="instru-strong">Prepare your CSV file:</strong>  
              Before uploading, make sure your file follows the <strong>exact column format</strong> below:
              <pre>
        Message ID, Subject, Message, Spam/Ham
              </pre>
              Each row should contain one email sample.  
              <ul>
                <li><strong>Message ID</strong> — a unique identifier for each email (e.g., 1, 2, 3...).</li>
                <li><strong>Subject</strong> — the subject line of the email.</li>
                <li><strong>Message</strong> — the full message body (can include punctuation and spaces).</li>
                <li><strong>Spam/Ham</strong> — use <strong>1</strong> for <strong>Spam</strong> and <strong>0</strong> for <strong>Ham</strong> (non-spam).</li>
              </ul>
            </li>

            <li>
              <strong className="instru-strong">Upload the CSV file:</strong>  
              Click the <strong>“Upload CSV”</strong> button and select your file.  
              Only properly formatted CSV files will be processed.
            </li>

            <li>
              <strong className="instru-strong">Click “Submit”:</strong>  
              After uploading, press <strong>Submit</strong> to begin analysis.  
              The system will check each message, evaluate spam probability, and generate visual reports.
            </li>

            <li>
              <strong className="instru-strong">View the analysis results:</strong>  
              <ul>
                <li>
                  <strong>Overall accuracy</strong> — shows how accurately spam was identified.
                </li>
                <li>
                  <strong>Spam/Ham breakdown</strong> — distribution of spam (1) vs ham (0).
                </li>
                <li>
                  <strong>Visualization chart</strong> — displays detection rate, confidence scores, and error ratios.
                </li>
              </ul>
            </li>
          </ol>
        </div>



        <div className="instru-image">
          <img src="/uploadDemo.png" alt="Instruction demo" />
        </div>
        </section>


      </div>

      <footer className="bottom-divider"></footer>

      <div>        
      <section id="AIintroduction" className="instru-section">

        <div className="instru-image">
          <img src="/demoAI.png" alt="Instruction demo" />
        </div>
        <div className="instru-text">
          <h2>More accuracy, less confusion with our AI Email Detector</h2>
        <p>
          Our system is powered by advanced machine learning models — Logistic Regression, Random Forest, and Naive Bayes — trained on over 30,000+ real and phishing emails.</p>
        <p>Unlike most AI detectors that rely solely on language patterns, our model analyzes multiple layers of email content, including subject lines, sender details, message tone, 
          and embedded links, to deliver highly reliable phishing detection results.</p>

        <p>We designed this tool to make email safety smarter, fairer, and more accurate — minimizing false positives while helping users identify truly suspicious messages with confidence.</p>
        </div>


        </section>


      </div>
     <footer className="bottom-divider"></footer>
      <div>        
      <section id="AIintroduction" className="instru-section">


        <div className="instru-text">
          <h2>Team Introduction</h2>
          <p><strong>Project Manager:</strong> Valerian Raimon</p>
          <p><strong>Machine Learning Engineer:</strong> Chi Thien Ly</p>
          <p><strong>UI/UX Designer:</strong> Jinxi Chen</p>
        </div>

      </section>
    </div>
                    

    </div>
    
  );
}