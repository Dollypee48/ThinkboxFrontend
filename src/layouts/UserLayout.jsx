// src/layouts/UserLayout.jsx
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

export default function UserLayout({ children }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-700">ThinkBox</h1>
        <nav className="flex gap-4">
          <Link to="/dashboard" className="text-gray-700 hover:text-purple-700">Dashboard</Link>
          <Link to="/problems" className="text-gray-700 hover:text-purple-700">Problems</Link>
          <Link to="/submit" className="text-gray-700 hover:text-purple-700">Submit</Link>
          <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow px-6 py-10">{children}</main>
    </div>
  );
}
