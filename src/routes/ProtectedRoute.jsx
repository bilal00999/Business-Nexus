import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();

  console.log("[ProtectedRoute] user:", user, "required role:", role);

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) {
    console.log("[ProtectedRoute] Role mismatch, redirecting to dashboard.");
    return <Navigate to={`/dashboard/${user.role}`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
