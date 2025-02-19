import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../assets/Searchmovie.css';

export const Searchmovie = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [query, setQuery] = useState("");

    const searchMovie = async () => {
        try {
            const res = await axios.get(`http://www.omdbapi.com/?apikey=87abafe6&s=${query}`);
            
            if (res.data.Search) {
                setMoviesData(res.data.Search);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    return (
        <div className="movie-search-container">
            <h1 className="search-header">Movie Search</h1>
            
            <div className="search-wrapper">
                <input 
                    type="text" 
                    className="search-input"
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter movie name"
                />
                <button 
                    className="search-button" 
                    onClick={searchMovie}
                >
                    Search Movie
                </button>
            </div>

            <div className="movies-grid">
                {moviesData?.map((movie) => (
                    <div className="movie-card" key={movie.imdbID}>
                        <Link to={`/moviedetail/${movie.imdbID}`}>
                            <img 
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://placeholder.com/300x450"} 
                                className="movie-card-image" 
                                alt={movie.Title}
                            />
                        </Link>
                        <div className="movie-card-body">
                            <h5 className="movie-title">{movie.Title}</h5>
                            <p className="movie-year">Year: {movie.Year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}