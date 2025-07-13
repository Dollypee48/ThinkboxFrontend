// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const { user } = useSelector((state) => state.auth);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!user && !storedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
