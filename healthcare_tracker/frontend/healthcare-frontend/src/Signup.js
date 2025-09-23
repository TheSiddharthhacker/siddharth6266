import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
        { email, password }
      );
      toast.success(res.data.message || "✅ Signup successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Signup failed!");
    }
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center font-poppins">
        Create Your Account
      </h2>

      {/* Form */}
      <form onSubmit={handleSignup} className="space-y-5">
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
