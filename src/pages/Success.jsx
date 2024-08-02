import React, { useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext';

const Success = () => {

    // Access clearCart function from CartContext
    const { clearCart } = useContext(CartContext);

    // Clear the cart on component mount using useEffect
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Payment Successful</h2>
            <p>Thank you for your purchase!</p>
        </div>
    );
};

export default Success;
