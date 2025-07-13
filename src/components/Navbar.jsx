import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

        <div className={`md:flex items-center space-x-4 ${menuOpen ? "block mt-4" : "hidden md:block mt-0"}`}>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-gray-700 hover:text-purple-700 font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/submit"
                className="block text-gray-700 hover:text-purple-700 font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                Submit Problem
              </Link>
              <Link
                to="/problems"
                className="block text-gray-700 hover:text-purple-700 font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                My Problems
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-purple-700 font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded font-medium"
                onClick={() => setMenuOpen(false)}
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
