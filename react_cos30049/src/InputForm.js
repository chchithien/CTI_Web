import React, { useState } from "react";
import axios from "axios";
import "./InputForm.css";

// ✅ CORRECT API URL - Change from port 8000 to 5001
const API_URL = "http://127.0.0.1:5001";

export default function InputForm({ onResult }) {
  const [mode, setMode] = useState("paste"); // paste or upload
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "paste") {
        // Single email mode
        if (!text.trim()) {
          setError("Message text is required!");
          setLoading(false);
          return;
        }

        // Combine title and text
        const emailContent = title ? `${title}\n\n${text}` : text;

        // ✅ CORRECT ENDPOINT: /predict (not /predict with title/text)
        const response = await axios.post(`${API_URL}/predict`, {
          email: emailContent,  // ✅ Send as "email" field
        });

        // Pass result to parent
        onResult({
          title: title || "Untitled",
          prediction: response.data.prediction,
          confidence: response.data.confidence,
          probabilities: response.data.probabilities,
        });

      } else if (mode === "upload") {
        // CSV upload mode
        if (!file) {
          setError("Please upload a CSV file first!");
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        // ✅ CORRECT ENDPOINT: /predict-csv (not /upload_csv)
        const response = await axios.post(`${API_URL}/predict-csv`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Pass CSV results to parent
        onResult({
          title: `CSV: ${file.name}`,
          prediction: `${response.data.spam_count} spam, ${response.data.ham_count} ham`,
          confidence: response.data.spam_percentage / 100,
          probabilities: {
            spam: response.data.spam_percentage / 100,
            ham: (100 - response.data.spam_percentage) / 100,
          },
          csvData: response.data, // Include full CSV data
        });

        // Clear file after success
        setFile(null);
      }
    } catch (err) {
      console.error("API Error:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.code === "ERR_NETWORK") {
        setError("Cannot connect to server. Make sure Flask is running on port 5001.");
      } else {
        setError("Failed to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const totalChars = title.length + text.length;

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="mode-switch">
        <button
          type="button"
          className={mode === "paste" ? "active" : ""}
          onClick={() => setMode("paste")}
        >
          Paste text
        </button>
        <button
          type="button"
          className={mode === "upload" ? "active" : ""}
          onClick={() => setMode("upload")}
        >
          Upload doc
        </button>
      </div>

      {mode === "paste" ? (
        <>
          <h2>Copy the suspicious email or message</h2>

          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter email or message title..."
            />
          </div>

          <div>
            <label>Message</label>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Enter message body..."
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="button-row">
            <span className="char-count">{totalChars} chars</span>
            <button type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Check Spam"}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Upload CSV file (Only check the first ten)</h2>
          <p style={{ fontSize: "0.9em", color: "#666", marginTop: "-10px" }}>
            Format: <code>Message id, subject, message</code> 
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && <p>📄 {file.name}</p>}
          {error && <p className="error-message">{error}</p>}
          <div className="button-row" style={{ justifyContent: "flex-end" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Analyze CSV"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}