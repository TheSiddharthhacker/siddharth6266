import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-green-300 to-green-100 font-inter">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-10 relative">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/heart.png"
            alt="Healthcare Logo"
            className="w-14 h-14 mb-2"
          />
          <h1 className="text-2xl font-bold text-green-700 font-poppins">
            Healthcare Portal
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-inter">
            Manage your health with ease 💚
          </p>
        </div>

        {/* Child Page (Login/Signup) */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
