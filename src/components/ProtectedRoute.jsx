import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  if (!userLogin) {
    return <Navigate to="/" replace />;
  }

  if (role && userLogin.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
