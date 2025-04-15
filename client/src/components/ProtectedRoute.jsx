// ProtectedRoute.js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");

  if (!token) return <Navigate to="/" replace />;  // Redirect to home if not authenticated
  if (adminOnly && user?.role !== "admin") return <Navigate to="/dashboard" replace />;  // Redirect if not admin
  return children;  // Allow access to children if authenticated
}
