import { useEffect, useState } from "react";
import { getReviews } from "../services/reviewService";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [totalReviews, setTotalReviews] =
    useState(0);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviews = await getReviews();

        setTotalReviews(reviews.length);

      } catch (error) {
        console.error(error);
      }
    }

    fetchReviews();
  }, []);

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
          marginBottom: "30px",
        }}
      >
        My Profile
      </h1>

      <div
        style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: "20px",
          padding: "35px",
          maxWidth: "850px",
        }}
      >
        {/* User Info */}

        <div
          style={{
            marginBottom: "30px",
            borderBottom:
              "1px solid #27272a",
            paddingBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "8px",
            }}
          >
            {user?.name}
          </h2>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "18px",
            }}
          >
            {user?.email}
          </p>
        </div>

        {/* Stats */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "25px",
          }}
        >
          <div
            style={{
              background: "#0f0f0f",
              padding: "25px",
              borderRadius: "12px",
              border:
                "1px solid #27272a",
            }}
          >
            <h4
              style={{
                color: "#9ca3af",
                marginBottom: "10px",
              }}
            >
              Role
            </h4>

            <p
              style={{
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              {user?.role}
            </p>
          </div>

          <div
            style={{
              background: "#0f0f0f",
              padding: "25px",
              borderRadius: "12px",
              border:
                "1px solid #27272a",
            }}
          >
            <h4
              style={{
                color: "#9ca3af",
                marginBottom: "10px",
              }}
            >
              Total Reviews
            </h4>

            <p
              style={{
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              {totalReviews}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;