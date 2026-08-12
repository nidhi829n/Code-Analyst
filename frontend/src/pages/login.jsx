import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await loginUser(formData);
      const user = data.data.user || data.data;

      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login Failed"
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#121214] p-8 rounded-2xl border border-zinc-800 shadow-2xl relative">
        
        {/* Back to Landing Page Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <FaArrowLeft /> Back to home
        </Link>

        <h1 className="text-3xl font-bold mb-6 tracking-tight">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-[#18181b] border border-zinc-800 focus:outline-none focus:border-blue-600 text-sm transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-[#18181b] border border-zinc-800 focus:outline-none focus:border-blue-600 text-sm transition-all"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition-all text-sm shadow-lg shadow-blue-900/20 cursor-pointer"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-red-400 text-sm font-medium">
            {message}
          </p>
        )}

        <p className="mt-6 text-zinc-400 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white font-medium hover:underline">
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;