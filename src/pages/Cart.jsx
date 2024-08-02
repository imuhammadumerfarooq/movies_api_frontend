import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { useAuth } from '../components/AuthContext'

const Cart = () => {

    // Accesses cart data and functions from CartContext
    const { cart, removeFromCart, updateCartQuantity, clearCart } = useContext(CartContext);

    // Accessing isLoggedIn state from AuthContext
    const { isLoggedIn } = useAuth();

    // Initializes useNavigate for navigation within the application
    const navigate = useNavigate();

    // Initializes state for total cart price
    const [totalPrice, setTotalPrice] = useState(0);

    // Calculates total price and updates state whenever cart or item quantities change
    useEffect(() => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalPrice(total);
    }, [cart]);

    // Redirects to checkout or login page based on authentication status
    const handleCheckout = () => {
        if (isLoggedIn) {
            navigate('/checkout');
        } else {
            navigate('/login');
        }
    }

    // Updates quantity of an item in the cart
    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity > 0) {
            updateCartQuantity(itemId, newQuantity);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                {cart.length > 0 &&
                    <button
                        onClick={clearCart}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Clear Cart
                    </button>
                }
            </div>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cart.map((item) => (
                        <div key={item.id} className="border rounded p-4">
                            <img
                                src={item.coverImage}
                                alt={item.title}
                                className="w-full h-96 object-cover"
                            />
                            <h2 className="text-xl font-bold mt-2">{item.title}</h2>
                            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                            <p>Year: {item.year}</p>
                            <p>Genre: {item.genre}</p>
                            <p>Rating: {item.rating}</p>
                            <div className="flex items-center mt-2">
                                <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    className="bg-gray-300 px-2 py-1 rounded-l"
                                >
                                    -
                                </button>
                                <span className="px-4">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    className="bg-gray-300 px-2 py-1 rounded-r"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Remove from Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {/* Renders checkout button only when items are in the cart */}
            {cart.length > 0 && (
                <div className="flex justify-center items-center">
                    <p className="text-xl font-bold mt-4 mr-2">Total Price: ${totalPrice.toFixed(2)}</p>
                    <button
                        onClick={handleCheckout}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
