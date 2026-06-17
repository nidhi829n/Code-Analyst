import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Landing() {
  const token = localStorage.getItem("token");

  // Agar login hai to dashboard bhejo
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "white",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "80vh",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          AI Powered
          <br />
          Code Reviews
        </h1>

        <p
          style={{
            maxWidth: "800px",
            fontSize: "24px",
            color: "#9ca3af",
            lineHeight: "1.6",
            marginBottom: "40px",
          }}
        >
          Review your code instantly using AI.
          Detect bugs, improve performance,
          follow best practices and write
          production-ready software faster.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Link
            to="/signup"
            style={{
              background: "white",
              color: "black",
              padding: "15px 35px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Get Started
          </Link>

          <Link
            to="/login"
            style={{
              border: "1px solid #444",
              color: "white",
              padding: "15px 35px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;