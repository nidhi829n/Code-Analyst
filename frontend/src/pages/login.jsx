import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

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

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

      navigate("/dashboard");

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-red-400">
          {message}
        </p>

        <p className="mt-6 text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-white"
          >
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;