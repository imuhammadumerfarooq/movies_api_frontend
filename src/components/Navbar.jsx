import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {

    // Accessing authentication state and methods from AuthContext
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">Movie App</Link>
                <div>

                    {/* Conditional rendering based on user authentication */}
                    {isLoggedIn && (
                        <Link to="/add" className="text-gray-300 mr-4 hover:text-white">Add Movie</Link>
                    )}

                    {/* Link to the cart page */}
                    <Link to="/cart" className="text-gray-300 mr-4 hover:text-white">Cart</Link>

                    {/* Conditional rendering based on user authentication */}
                    {isLoggedIn && (
                        <Link to="/transactions" className="text-gray-300 mr-4 hover:text-white">Transactions</Link>
                    )}

                    {/* Conditional rendering of login/logout and signup links */}
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="text-gray-300 hover:text-white">
                            Log Out
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 mr-4 hover:text-white">Log In</Link>
                            <Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link>
                        </>
                    )}
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
