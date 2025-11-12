import React, { useState } from "react";
import InputForm from "./InputForm";
import ResultCard from "./ResultCard";
import ChartView from "./ChartView";
import "./App.css";

export default function App() {
  const [result, setResult] = useState(null);

  const handleNewResult = (newResult) => {
    setResult(newResult);

  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
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

      {/* Input Instruction */}
      <div>
        <section id="instruction" className="instru-section">
          <div className="instru-text">
            <h2>Instruction (Input)</h2>
            <ol>
              <li>
                <strong className="instru-strong">Copy the email:</strong> Open the suspicious email and copy both its
                <strong> subject</strong> and <strong>entire message body</strong>.
              </li>
              <li>
                <strong className="instru-strong">Paste into the input box:</strong> Paste everything into the text area on the left.
              </li>
              <li>
                <strong className="instru-strong">Click “Submit”:</strong> Start the analysis to detect phishing or fake links.
              </li>
              <li>
                <strong className="instru-strong">View results:</strong> Review detailed findings and visualization charts.
              </li>
            </ol>
          </div>
          <div className="instru-image">
            <img src="/demo.png" alt="Instruction demo" />
          </div>
        </section>
      </div>

      {/* CSV Upload Instruction */}
      <div>
        <section id="csv-instruction" className="instru-section">
          <div className="instru-text">
            <h2>Instruction (CSV Upload)</h2>
            <ol>
              <li>
                <strong className="instru-strong">Prepare your CSV file:</strong> Must include columns:
                <pre>Message ID, Subject, Message, Spam/Ham</pre>
              </li>
              <li>
                <strong className="instru-strong">Upload the CSV file:</strong> Use the “Upload CSV” button.
              </li>
              <li>
                <strong className="instru-strong">Click “Submit”:</strong> The system will evaluate each message.
              </li>
              <li>
                <strong className="instru-strong">View the analysis results:</strong> Shows overall accuracy and breakdown.
              </li>
            </ol>
          </div>
          <div className="instru-image">
            <img src="/uploadDemo.png" alt="Instruction demo" />
          </div>
        </section>
      </div>

      <footer className="bottom-divider"></footer>

      {/* AI Introduction */}
      <div>
        <section id="AIintroduction" className="instru-section">
          <div className="instru-image">
            <img src="/demoAI.png" alt="Instruction demo" />
          </div>
          <div className="instru-text">
            <h2>More accuracy, less confusion with our AI Email Detector</h2>
            <p>
              Our system is powered by advanced machine learning models — Logistic Regression, Random Forest, and Naive Bayes — trained on over 30,000+ real and phishing emails.
            </p>
            <p>
              Unlike most AI detectors that rely solely on language patterns, our model analyzes multiple layers of email content, including subject lines, sender details, message tone, and embedded links.
            </p>
            <p>
              We designed this tool to make email safety smarter, fairer, and more accurate — minimizing false positives while helping users identify truly suspicious messages with confidence.
            </p>
          </div>
        </section>
      </div>

      <footer className="bottom-divider"></footer>

      {/* Team Introduction */}
      <div>
        <section id="team-introduction" className="instru-section">
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
