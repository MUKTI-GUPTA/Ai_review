import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";
import rehypeHighlight from "rehype-highlight";

function App() {
  const [code, setCode] = useState(`sample code`);
  const [review, setReview] = useState();
  const [loading, setLoading] = useState(false); // 🔹 Track loading state

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewCode() {
    setLoading(true); //Start loading
    setReview(""); // Clear previous review

    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });

      setReview(response.data);
    } catch (error) {
      console.error("Error fetching AI review:", error);
      setReview("Failed to fetch review.");
    } finally {
      setLoading(false); // 🔹 Stop loading
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontSize: 16,
                fontFamily: "'fira code','fira Mono',monospace",
                width: "100%",
                height: "100%",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            {loading ? "Generating..." : "Review"}
          </div>
        </div>

        <div className="right">
          {loading ? (
            <div className="spinner"></div> // 🔹 Show spinner when loading
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
