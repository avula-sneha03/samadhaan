import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear JWT token from localStorage
    localStorage.removeItem('jwt');
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4', margin: 0 }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
        <h2>You are logged in!</h2>
        <p>Are you sure you want to log out?</p>
        <button
          onClick={handleLogout}
          style={{ padding: '10px 20px', backgroundColor: '#5cb85c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
