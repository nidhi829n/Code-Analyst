import { useState, useEffect } from "react";
import axios from "axios";

import Editor from "react-simple-code-editor";
import prism from "prismjs";

import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";


import { API_URL } from "../config/api";

function Dashboard() {
  const [language, setLanguage] =
    useState("javascript");

  const [code, setCode] = useState(
`function sum() {
  return 1 + 1;
}`
  );

  const [review, setReview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await axios.post(
          `${API_URL}/ai/get-review`,
          {
            code,
            language,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setReview(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#000",
      }}
    >
      
      <div
        style={{
          flex: 1,
          padding: "30px",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "25px",
          }}
        >
          Dashboard
        </h1>

        {/* Language Selector */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <select
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
            style={{
              background: "#18181b",
              color: "white",
              padding: "12px 18px",
              borderRadius: "10px",
              border:
                "1px solid #333",
            }}
          >
            <option value="javascript">
              JavaScript
            </option>

            <option value="python">
              Python
            </option>

            <option value="java">
              Java
            </option>

            <option value="cpp">
              C++
            </option>

            <option value="c">
              C
            </option>
          </select>
        </div>

        {/* Editor */}

        <div
          style={{
            background: "#18181b",
            borderRadius: "15px",
            border:
              "1px solid #27272a",
            padding: "20px",
            minHeight: "500px",
            marginBottom: "25px",
          }}
        >
          <Editor
            value={code}
            onValueChange={(code) =>
              setCode(code)
            }
            highlight={(code) =>
              prism.highlight(
                code,
                prism.languages
                  .javascript,
                "javascript"
              )
            }
            padding={15}
            style={{
              fontFamily:
                '"Fira Code", monospace',
              fontSize: 16,
              minHeight: "400px",
              color: "white",
            }}
          />
        </div>

        {/* Button */}

        <button
          onClick={reviewCode}
          disabled={loading}
          style={{
            background: "#ffffff",
            color: "#000",
            border: "none",
            padding:
              "14px 28px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "30px",
          }}
        >
          {loading
            ? "Generating..."
            : "Review Code"}
        </button>

        {/* AI Review */}

        <div
          style={{
            background: "#18181b",
            borderRadius: "15px",
            border:
              "1px solid #27272a",
            padding: "20px",
            minHeight: "250px",
          }}
        >
          <h2
            style={{
              marginBottom: "15px",
              fontSize: "32px",
            }}
          >
            AI Review
          </h2>

          {review ? (
            <Markdown
              rehypePlugins={[
                rehypeHighlight,
              ]}
            >
              {review}
            </Markdown>
          ) : (
            <p
              style={{
                color: "#9ca3af",
              }}
            >
              Generate a review to see
              feedback here.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;