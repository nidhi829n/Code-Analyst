import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../services/authService";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      const data = await signupUser(formData);

      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Signup Failed"
      );

    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

        <h1 className="text-3xl font-bold mb-6">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
          />

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
            Create Account
          </button>

        </form>

        <p className="mt-4 text-green-400">
          {message}
        </p>

        <p className="mt-6 text-zinc-400">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-white"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;