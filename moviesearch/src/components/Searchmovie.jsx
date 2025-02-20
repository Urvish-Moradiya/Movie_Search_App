import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../assets/Searchmovie.css';

// movie search pan thase and ena par click kari details batavse also like pan kari sakso 
export const Searchmovie = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [isShowingFavorites, setIsShowingFavorites] = useState(false);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=87abafe6&s=${searchTerm}`
            );
            if (response.data.Search) {
                setMovies(response.data.Search);
                setIsShowingFavorites(false);
            }
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    };

    const toggleFavorite = (movie) => {
        let updatedFavorites;
        if (favorites.find(fav => fav.imdbID === movie.imdbID)) {
            updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
        } else {
            updatedFavorites = [...favorites, movie];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.imdbID === movieId);
    };

    return (
        <div className="search-container">
            <div className="search-header">
                <h1>Movie Search</h1>
                <div className="search-controls">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Enter movie name..."
                        className="search-input"/>
                    <button onClick={handleSearch} className="search-button">
                        Search
                    </button>
                </div>

                <button onClick={() => setIsShowingFavorites(!isShowingFavorites)} className="toggle-favorites">
                    {isShowingFavorites ? 'Show All Movies' : 'Show Favorites'}
                </button>
            </div>
             <div className="movies-grid">
                {(isShowingFavorites ? favorites : movies).map(movie => (
                    <div key={movie.imdbID} className="movie-card">
                        <div className="poster-container">
                            <Link to={`/moviedetail/${movie.imdbID}`}>
                                <img src={movie.Poster} alt={movie.Title} className="movie-poster"/>
                            </Link>
                            
                            <button onClick={() => toggleFavorite(movie)} className={`favorite-button ${isFavorite(movie.imdbID) ? 'is-favorite' : ''}`}>
                                {isFavorite(movie.imdbID) ? '❤️' : '🤍'}
                            </button>
                        </div>

                        <div className="movie-info">
                            <h3>{movie.Title}</h3>
                            <p>{movie.Year}</p>
                        </div>
                    </div>
                ))}
            </div>
            {isShowingFavorites && favorites.length === 0 && (
                <div className="empty-message">
                    No favorite movies yet! Start adding some favorites.
                </div>
            )}
        </div>
    );
};