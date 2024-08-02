import React, { createContext, useCallback, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

    const [cart, setCart] = useState(initialCart);

    // Updates localStorage whenever cart state changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Adds a movie to the cart or updates quantity if already present
    const addToCart = (movie) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === movie.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === movie.id ? { ...item, quantity: item.quantity + 1, price: movie.price } : item
                );
            }
            return [...prevCart, { ...movie, quantity: 1 }];
        });
    };

    // Removes a movie from the cart by ID
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };

    // Updates quantity of a movie in the cart by ID
    const updateCartQuantity = (id, newQuantity) => {
        setCart(cart.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    // Clears the entire cart
    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    // Provides cart state and functions to child components via context
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
