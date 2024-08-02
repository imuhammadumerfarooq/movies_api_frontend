import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Check localStorage for login state
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                return savedUser ? JSON.parse(savedUser) : null;
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
                return null;
            }
        }
        return null
    });

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
        if (user) {
            localStorage.setItem('token', user);
        } else {
            localStorage.removeItem('user');
        }
    }, [isLoggedIn, user]);

    const login = (userData, newToken) => {
        setUser(userData);
        setIsLoggedIn(true);
        setToken(newToken);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        setToken(null);

    };

    return (
        <AuthContext.Provider value={{isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
