import React from "react";

const API_URL = "http://127.0.0.1:5001";

export default function ResultCard({ result }) {
  if (!result) {
    return (
      <div className="p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">AI Detection Result</h2>
        <p className="text-gray-500">Awaiting input...</p>
      </div>
    );
  }

  // Handle CSV results
  if (result.csvData) {
    return (
      <div className="p-6 bg-white shadow-xl rounded-2xl space-y-4">
        <h2 className="text-2xl font-bold text-center">📊 CSV Analysis Complete</h2>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">
              {result.csvData.total_emails}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Emails</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-red-600">
              {result.csvData.spam_count}
            </div>
            <div className="text-sm text-gray-600 mt-1">Spam</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">
              {result.csvData.ham_count}
            </div>
            <div className="text-sm text-gray-600 mt-1">Legitimate</div>
          </div>
        </div>

        {/* Spam Percentage */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-lg">
            <span className="font-bold text-2xl text-blue-600">
              {result.csvData.spam_percentage}%
            </span>{" "}
            of emails are spam
          </p>
        </div>

        {/* Accuracy (if available) */}
        {result.csvData.accuracy !== undefined && (
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-lg">
              <span className="font-bold text-2xl text-green-600">
                {result.csvData.accuracy}%
              </span>{" "}
              Prediction Accuracy
            </p>
          </div>
        )}

        {/* Download Button */}
        <button
          onClick={() => {
            window.location.href = `${API_URL}${result.csvData.download_url}`;
          }}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          ⬇️ Download Full Results (CSV)
        </button>

        {/* Preview */}
        {result.csvData.predictions && result.csvData.predictions.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Preview (First 10 emails)</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {result.csvData.predictions.map((pred, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                >
                  <div className="flex-1">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        pred.prediction === "spam"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {pred.prediction}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      {(pred.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {pred.text_preview}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Handle single email results
  const isSpam = result.prediction === "spam";

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl space-y-4">
      <h2 className="text-2xl font-bold text-center">AI Detection Result</h2>

      {/* Prediction Badge */}
      <div
        className={`p-4 rounded-lg text-center ${
          isSpam
            ? "bg-red-50 border-2 border-red-300"
            : "bg-green-50 border-2 border-green-300"
        }`}
      >
        <div className="text-2xl font-bold">
          {isSpam ? "⚠️ SPAM DETECTED" : "✅ LEGITIMATE EMAIL"}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <p className="text-lg">
          <strong>Prediction:</strong>{" "}
          <span
            className={`font-bold ${
              isSpam ? "text-red-600" : "text-green-600"
            }`}
          >
            {result.prediction.toUpperCase()}
          </span>
        </p>
        <p className="text-lg">
          <strong>Confidence:</strong>{" "}
          <span className="font-bold text-blue-600">
            {(result.confidence * 100).toFixed(1)}%
          </span>
        </p>
      </div>

      {/* Probabilities */}
      {result.probabilities && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
          <p className="text-sm">
            <strong>Spam probability:</strong>{" "}
            <span className="text-red-600 font-semibold">
              {(result.probabilities.spam * 100).toFixed(1)}%
            </span>
          </p>
          <p className="text-sm">
            <strong>Ham probability:</strong>{" "}
            <span className="text-green-600 font-semibold">
              {(result.probabilities.ham * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
