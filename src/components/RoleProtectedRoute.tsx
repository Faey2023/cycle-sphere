import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface RoleProtectedRouteProps {
  allowedRoles: string[];  // List of roles that are allowed to access the route
  children: React.ReactNode; // The component(s) to render if access is granted
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Check if the user is logged in and has the correct role
  const userHasAccess = user && user.role && allowedRoles.includes(user.role);

  if (!user || !userHasAccess) {
    // If the user doesn't have the correct role, redirect to the unauthorized page
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Render the children (i.e., the protected content) if the user has the correct role
  return <>{children}</>;
};

export default RoleProtectedRoute;
