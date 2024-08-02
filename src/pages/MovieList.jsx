import React, { useEffect, useState } from 'react';
import { MovieCard } from '../components';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState(8);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalMovies, setTotalMovies] = useState();

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8080/movies?limit=8&offset=${offset}`);
                const data = await res.json();
                if (data.movies.length > 0) {
                    setMovies(prevMovies => [...prevMovies, ...data.movies]);
                    setTotalMovies(data.count);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();

    }, [offset]);

    const loadMoreMovies = () => {
        const newOffset = offset + 8;
        setOffset(newOffset);
        setVisibleMovies(newOffset + 8); // Update visible movies count
        
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.slice(0, visibleMovies).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            { movies.length === totalMovies ? null : (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={loadMoreMovies}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-900"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Show More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovieList;
