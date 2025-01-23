import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../Components/Home/Home';
import LoginSignup from '../Components/LoginSignup';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import LogoutPage from '../Components/Logout';
import ConnectDoc from '../Components/Connect/ConnectDoc';
import Discussions from '../Components/Discussions/Discussions';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<LoginSignup />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/connectdoc" element={<ConnectDoc />} />
          <Route path="/discussions" element={<Discussions />} />
        </Route>

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
