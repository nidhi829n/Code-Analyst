import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

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
    <nav
      style={{
        background: "#0f0f0f",
        color: "white",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #222",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: "700",
        }}
      >
        CodeAnalyst
      </h2>

      {user && (
        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <Link
            to="/dashboard"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            History
          </Link>

          <Link
            to="/profile"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Profile
          </Link>

          <button
            onClick={logout}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;