import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Sidebar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        width: "250px",
        background: "#000",
        color: "white",
        padding: "20px",
        borderRight: "1px solid #222",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          marginBottom: "50px",
        }}
      >
        CodeAnalyst
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/history"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
          }}
        >
          History
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
          }}
        >
          Profile
        </Link>

        <button
          onClick={logout}
          style={{
            background: "none",
            border: "none",
            color: "white",
            textAlign: "left",
            fontSize: "20px",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;