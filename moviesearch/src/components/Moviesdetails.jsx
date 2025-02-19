import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../assets/Moviedetails.css';

export const Moviesdetails = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    
    useEffect(() => { 
        getDetail();
    }, []);

    const getDetail = async () => {
        try {
            const res = await axios.get(`http://www.omdbapi.com/?apikey=87abafe6&i=${id}`);
            setDetail(res.data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };  

    if (!detail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-details-container">
            <div className="movie-details-wrapper">
                <img 
                    src={detail.Poster} 
                    alt={detail.Title} 
                    className="movie-poster"
                />
                <div className="movie-info">
                    <h1 className="movie-title">{detail.Title}</h1>
                    
                    <div className="movie-details-grid">
                        <div className="movie-detail-item">
                            <span className="detail-label">Year:</span>
                            <span className="detail-value">{detail.Year}</span>
                        </div>
                        <div className="movie-detail-item">
                            <span className="detail-label">Rated:</span>
                            <span className="detail-value">{detail.Rated}</span>
                        </div>
                        <div className="movie-detail-item">
                            <span className="detail-label">Released:</span>
                            <span className="detail-value">{detail.Released}</span>
                        </div>
                        <div className="movie-detail-item">
                            <span className="detail-label">Runtime:</span>
                            <span className="detail-value">{detail.Runtime}</span>
                        </div>
                        <div className="movie-detail-item">
                            <span className="detail-label">Genre:</span>
                            <span className="detail-value">{detail.Genre}</span>
                        </div>
                        <div className="movie-detail-item">
                            <span className="detail-label">Director:</span>
                            <span className="detail-value">{detail.Director}</span>
                        </div>
                    </div>

                    <div className="movie-plot">
                        <strong className="detail-label">Plot:</strong>
                        {detail.Plot}
                    </div>

                    <div className="rating-section">
                        <strong className="detail-label">IMDb Rating:</strong>
                        <div className="imdb-rating">{detail.imdbRating}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Moviesdetails;