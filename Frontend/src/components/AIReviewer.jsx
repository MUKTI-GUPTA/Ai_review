import { useState } from "react";

function AIReviewer() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateReview = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/generate-review", {
        method: "POST",
        body: JSON.stringify({ text: "User input" }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setResponse(data.review);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Failed to generate review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-container">
      <button onClick={handleGenerateReview} disabled={loading}>
        {loading ? "Generating..." : "Generate Review"}
      </button>

      {loading && <div className="spinner"></div>}

      {response && <p className="response">{response}</p>}
    </div>
  );
}

export default AIReviewer;
