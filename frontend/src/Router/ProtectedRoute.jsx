import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../Config/axiosConfig'; // Adjust the import path as necessary

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        const checkTokenValidity = async () => {
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                await axiosInstance.get("/home"); // Make the request to validate the token
            
                setIsAuthenticated(true); // Token is valid
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false); // Token is invalid or request failed
            }
        };
        console.log("protected route has been called")
        checkTokenValidity();
    }, [token]); // Dependency array includes token

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Optionally show a loading state
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;