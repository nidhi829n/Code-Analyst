import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import { API_URL } from "../config/api";

function ReviewDetails() {

  const { id } = useParams();

  const [review, setReview] = useState(null);

  useEffect(() => {

    async function fetchReview() {

      try {

        const token =
          localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/reviews/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReview(response.data);

      } catch (error) {

        console.error(error);

      }
    }

    fetchReview();

  }, [id]);

  if (!review) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>

      <h1>{review.language}</h1>

      <h2>Code</h2>

      <pre>
        {review.code}
      </pre>

      <h2>AI Review</h2>

      <Markdown
        rehypePlugins={[rehypeHighlight]}
      >
        {review.review}
      </Markdown>

    </div>
  );
}

export default ReviewDetails;