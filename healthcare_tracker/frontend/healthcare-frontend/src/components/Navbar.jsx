import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-yellow-300 border-b-2 border-yellow-300"
      : "hover:text-gray-200";

  return (
    <nav className="bg-green-600 text-white shadow-md sticky top-0 z-50 font-inter">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo + Title */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img src="/heart.png" alt="logo" className="w-8 h-8 rounded-full" />
          <h1 className="text-lg md:text-xl font-bold font-poppins">
            Healthcare
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/appointment-form" className={isActive("/appointment-form")}>
            Book Appointment
          </Link>
          <Link to="/appointment-list" className={isActive("/appointment-list")}>
            Appointments
          </Link>
          <Link to="/video-call" className={isActive("/video-call")}>
            Video Call
          </Link>
          <Link to="/signup" className={isActive("/signup")}>
            Signup
          </Link>
        </div>

        {/* Logout Button (Desktop only) */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-green-700 px-6 py-4 space-y-4 transform transition-all duration-300"
        >
          <Link to="/dashboard" className="block hover:text-gray-200" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/appointment-form" className="block hover:text-gray-200" onClick={() => setMenuOpen(false)}>Book Appointment</Link>
          <Link to="/appointment-list" className="block hover:text-gray-200" onClick={() => setMenuOpen(false)}>Appointments</Link>
          <Link to="/video-call" className="block hover:text-gray-200" onClick={() => setMenuOpen(false)}>Video Call</Link>
          <Link to="/signup" className="block hover:text-gray-200" onClick={() => setMenuOpen(false)}>Signup</Link>

          {/* Logout (Mobile) */}
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="w-full bg-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
