import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getReviews,
  deleteReview,
} from "../services/reviewService";

function History() {
  const [reviews, setReviews] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data =
        await getReviews();

      setReviews(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {

      await deleteReview(id);

      setReviews(
        reviews.filter(
          (review) =>
            review._id !== id
        )
      );

    } catch (error) {

      console.error(error);

    }
  };

  const filteredReviews =
    reviews.filter(
      (review) =>
        review.language
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        review.code
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "25px",
        }}
      >
        Review History
      </h1>

      {/* Search */}

      <input
        type="text"
        placeholder="Search reviews..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "12px",
          border:
            "1px solid #27272a",
          background: "#18181b",
          color: "white",
          marginBottom: "30px",
          fontSize: "16px",
          outline: "none",
        }}
      />

      {/* Empty State */}

      {filteredReviews.length === 0 && (
        <div
          style={{
            background: "#18181b",
            border:
              "1px solid #27272a",
            borderRadius: "16px",
            padding: "40px",
            textAlign: "center",
            color: "#9ca3af",
          }}
        >
          No reviews found.
        </div>
      )}

      {/* Review Cards */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {filteredReviews.map(
          (review) => (
            <div
              key={review._id}
              style={{
                background:
                  "#18181b",
                border:
                  "1px solid #27272a",
                borderRadius:
                  "16px",
                padding: "25px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginBottom:
                    "15px",
                }}
              >
                <span
                  style={{
                    background:
                      "#4f46e5",
                    padding:
                      "8px 14px",
                    borderRadius:
                      "8px",
                    fontSize:
                      "14px",
                  }}
                >
                  {
                    review.language
                  }
                </span>

                <span
                  style={{
                    color:
                      "#9ca3af",
                  }}
                >
                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              <pre
                style={{
                  color:
                    "#e5e7eb",
                  whiteSpace:
                    "pre-wrap",
                  marginBottom:
                    "20px",
                  fontSize:
                    "15px",
                }}
              >
                {review.code.slice(
                  0,
                  150
                )}
                ...
              </pre>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <Link
                  to={`/review/${review._id}`}
                  style={{
                    background:
                      "#10b981",
                    color:
                      "white",
                    padding:
                      "10px 18px",
                    borderRadius:
                      "10px",
                    textDecoration:
                      "none",
                  }}
                >
                  View Details
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      review._id
                    )
                  }
                  style={{
                    background:
                      "#ef4444",
                    color:
                      "white",
                    border:
                      "none",
                    padding:
                      "10px 18px",
                    borderRadius:
                      "10px",
                    cursor:
                      "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default History;