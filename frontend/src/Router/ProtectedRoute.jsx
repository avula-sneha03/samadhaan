import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if JWT token exists in localStorage
  const token = localStorage.getItem('jwt');

  if (!token) {
    // If there's no token, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If there's a token, render the protected route (outlet will render child routes)
  return <Outlet />;
};

export default ProtectedRoute;
