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
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-purple-700">
          ThinkBox 🧠
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-purple-700">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <div
          className={`${
            menuOpen
              ? "block absolute top-16 left-0 right-0 bg-white shadow-md p-4 space-y-4 md:space-y-0 md:space-x-4 md:flex"
              : "hidden md:flex items-center space-x-4"
          }`}
        >
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link" onClick={toggleMenu}>
                Dashboard
              </Link>
              <Link to="/submit" className="nav-link" onClick={toggleMenu}>
                Submit Problem
              </Link>
              <Link to="/problems" className="nav-link" onClick={toggleMenu}>
                My Problems
              </Link>
              <button
                onClick={handleLogout}
                className="nav-button bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={toggleMenu}>
                Login
              </Link>
              <Link
                to="/register"
                className="nav-button bg-purple-600 hover:bg-purple-700"
                onClick={toggleMenu}
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
