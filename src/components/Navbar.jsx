import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-purple-700"
          onClick={closeMenu}
        >
          ThinkBox 🧠
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-purple-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`${
            menuOpen
              ? "absolute top-16 left-0 right-0 bg-white shadow-md p-4 space-y-4 md:space-y-0 md:space-x-6 md:flex"
              : "hidden md:flex md:items-center md:space-x-6"
          } transition-all duration-300`}
        >
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 font-medium hover:text-purple-700"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/submit"
                className="text-gray-700 font-medium hover:text-purple-700"
                onClick={closeMenu}
              >
                Submit Problem
              </Link>
              <Link
                to="/problems"
                className="text-gray-700 font-medium hover:text-purple-700"
                onClick={closeMenu}
              >
                My Problems
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-purple-700"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
