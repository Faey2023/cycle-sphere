import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const RoleProtectedRoute = ({ allowedRoles, children }: RoleProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (!user || !user.role) {
    // Not logged in or role is missing
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Role not authorized
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
