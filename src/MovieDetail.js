import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        setMovie(response.data.data.movie);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="movie-detail">
      <Link to="/" className="back-button">⬅ Назад до списку</Link>
      <h2 className="movie-title">{movie.title}</h2>
      <img src={movie.medium_cover_image} alt={movie.title} className="movie-poster" />
      <p className="movie-year">Рік випуску: {movie.year}</p>
      <p className="movie-rating">Рейтинг: {movie.rating}/10</p>
      <p className="movie-runtime">Тривалість: {movie.runtime} хв</p>
      <p className="movie-summary">{movie.description_full}</p>
      <ul className="movie-genres"> 
        {movie.genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetail;
