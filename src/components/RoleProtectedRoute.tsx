import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';  // Import your context to check role

const RoleProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useAuth(); // Use the hook to get the context value

  // If the auth state is still loading, you can show a loading spinner or message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not an admin, redirect to a different page
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>; // Render the children if the user is an admin
};

export default RoleProtectedRoute;
