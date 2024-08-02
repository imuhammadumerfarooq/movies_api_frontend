import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { useAuth } from '../components/AuthContext';
import Popup from './Popup';


const MovieCard = ({ movie }) => {

  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  // Function to handle adding item to cart and showing the popup
  const handleAddToCart = () => {
    addToCart({ ...movie, quantity: 1 });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="border rounded p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl h-[50px] font-bold mb-2">{movie.title}</h2>
      <img
        src={movie.coverImage}
        alt={movie.title}
        className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded"
      />
      <p className="mt-2 text-gray-600">Year: {movie.year}</p>
      <p className="mt-1 text-gray-600">Genre: {movie.genre}</p>
      <p className="mt-1 text-gray-600">Rating: {movie.rating}</p>
      <p className="mt-2 font-bold text-gray-800">Price: ${movie.price.toFixed(2)}</p>
      <div className="mt-4 flex justify-between items-center">
        {/* Conditional rendering based on user authentication */}
        {isLoggedIn && (
          <Link to={`/edit/${movie.id}`} className="bg-yellow-500 text-white px-4 md:px-[6px] lg:px-4 py-3 rounded hover:bg-yellow-600">
            Edit Movie
          </Link>
        )}
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 md:px-[6px] lg:px-4 py-3 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
      {/* Popup component to show confirmation message */}
      {showPopup && (
        <Popup
          message="Item added to cart!"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default MovieCard;
