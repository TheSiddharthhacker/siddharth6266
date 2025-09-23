import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        { email, password }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("✅ Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("❌ Login failed. Please try again!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Login failed!");
    }
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center font-poppins">
        Login to Your Account
      </h2>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none font-inter"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none font-inter"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-poppins hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>

      {/* Signup Redirect */}
      <p className="mt-4 text-center text-sm font-inter text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-green-600 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
