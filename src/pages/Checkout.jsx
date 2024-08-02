import React, { useContext, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';

// Stripe test publishable key
const stripePromise = loadStripe('pk_test_51PM3XgJ8mel0IwGSMUkhaDcWIQT2E79QYu1EFwtBmjdFVpzPTYnY4wchtGBpoMggeJIhqIGn8v4CS964HRnkEjw500bJnmKwRY');

const Checkout = () => {

    const { cart } = useContext(CartContext);
    const navigate = useNavigate();


    useEffect(() => {

        // Function to create a checkout session
        const createCheckoutSession = async () => {
            try {
                // Retrieve the JWT token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }    
                // Send a POST request to your server to create a checkout session
                const response = await fetch('http://localhost:8080/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        line_items: cart.map((item) => ({
                            title: item.title,
                            price: item.price * 100,
                            quantity: item.quantity,
                            
                        })),
                        mode: 'payment',
                    }),
                });

                // Handle errors if the server request fails
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Server error: ${errorText}`);
                }

                // Parse the response JSON to get the session ID
                const session = await response.json();

                // Load Stripe and redirect to checkout page with session ID
                const stripe = await stripePromise;
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });

                // Handle any errors that occur during redirection
                if (result.error) {
                    console.error(result.error.message);
                    navigate('/error');
                }
            } catch (error) {
                console.error('Error creating checkout session:', error);
                navigate('/error');
            }
        };

        // Check if there are items in the cart before creating a checkout session
        if (cart.length > 0) {
            createCheckoutSession();
        } else {
            navigate('/cart');
        }
    }, [cart, navigate]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Checkout</h2>
            <p>Redirecting to payment...</p>
        </div>
    );
};

export default Checkout;
