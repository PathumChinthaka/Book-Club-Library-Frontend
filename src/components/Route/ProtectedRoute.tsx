import React from "react";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  const user = useSelector(selectCurrentUser);
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
