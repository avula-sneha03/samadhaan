import React, { useEffect, useState, useRef } from 'react';
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Navbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown visibility
    const dropdownRef = useRef(null); // Ref to track the dropdown element

    useEffect(() => {
        initMDB({ Dropdown, Collapse });
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#180039', padding: '10px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <img
                    src={logo}
                    height='100px'
                    onClick={() => { navigate("/") }}
                    alt="Logo"
                />
            </div>

            {/* Navigation Links */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div onClick={() => { navigate("/") }}>
                    <span style={{ color: '#C7AE6A', fontFamily: 'Arial', cursor: 'pointer' }}>Home</span>
                </div>

                <div style={{ marginLeft: '100px' }} onClick={() => { navigate("/connectdoc") }}>
                    <span style={{ color: '#C7AE6A', fontFamily: 'Arial', cursor: 'pointer' }}>Connect2Doc</span>
                </div>

                <div style={{ marginLeft: '100px' }} onClick={() => { navigate("/discussions") }}>
                    <span style={{ color: '#C7AE6A', fontFamily: 'Arial', cursor: 'pointer' }}>Discussions</span>
                </div>
            </div>

            {/* Profile Icon with Dropdown */}
            <div style={{ position: 'relative', marginLeft: '200px' }} ref={dropdownRef}>
                <div
                    style={{ color: '#C7AE6A', fontFamily: 'Arial', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    onClick={toggleDropdown}>
                    <i className="fas fa-user-circle" style={{ fontSize: '40px', color: '#C7AE6A' }}></i>
                </div>

                {isDropdownOpen && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '0',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                padding: '10px 20px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #ddd',
                                color: '#333',
                            }}
                            onClick={() => { navigate("/dashboard"); setIsDropdownOpen(false); }}>
                            My Dashboard
                        </div>
                        <div
                            style={{
                                padding: '10px 20px',
                                cursor: 'pointer',
                                color: '#333',
                            }}
                            onClick={() => { navigate("/logout"); setIsDropdownOpen(false); }}
                        >
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;