import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthState } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && !user) {
      dispatch({ type: "auth/setUser", payload: storedUser });
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthState());
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

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

        <div className={`md:flex items-center space-x-4 ${menuOpen ? "block absolute top-16 left-0 right-0 bg-white shadow-md p-4" : "hidden md:flex"}`}>
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
              <button onClick={handleLogout} className="nav-button bg-red-500 hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/register" className="nav-button bg-purple-600 hover:bg-purple-700">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}