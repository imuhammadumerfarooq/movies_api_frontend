import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    // State to manage form data and errors
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // State to handle and display form submission errors
    const [error, setError] = useState(null);

    // Initializes useNavigate for navigation within the application
    const navigate = useNavigate();

    // Function to update form data based on user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();       
        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Sign up failed.');
            }

            // Optionally handle successful signup, e.g., redirect to login
            navigate('/');
        } catch (error) {
            console.error('Error signing up:', error);
            setError(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block font-bold mb-1">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-bold mb-1">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-bold mb-1">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
            </form>
            <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500">Sign In</Link></p>
        </div>
    );
};

export default Signup;
