import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditMovie = () => {
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    genre: '',
    rating: '',
    coverImage: '',
    price: 0
  });
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetches the movie details from the server
  useEffect(() => {
    fetchMovie();
  }, []);

  // Function to fetch movie details from the backend
  const fetchMovie = async () => {
    try {
      const response = await fetch(`http://localhost:8080/movies/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie');
      }
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  };


  // Handles changes in input fields and updates the corresponding state
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Convert year and price inputs to numbers
    if (name === 'year' || name === 'price') {
      newValue = parseFloat(value) || 0;
    }

    setMovie({
      ...movie,
      [name]: newValue
    });
  };

  // Handles form submission to update the movie details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) {
        throw new Error('Failed to update movie');
      }
      navigate('/');
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  // Handles deletion of the movie from the database
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/movies/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      navigate('/');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Movie</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-4 shadow rounded">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={movie.year}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Genre</label>
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <input
            type="text"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={movie.coverImage}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={movie.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="w-40 bg-blue-500 text-white p-2 rounded">
            Update Movie
          </button>
          <button onClick={handleDelete} className="w-40 bg-red-500 text-white p-2 rounded">
            Delete Movie
          </button>
        </div>
      </form>
      <div className="mt-4">
      </div>
    </div>
  );
};

export default EditMovie;
