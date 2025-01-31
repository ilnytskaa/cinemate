import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Movie.css';

function Movie({ id, title, year, summary, poster, genres }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(movie => movie.id === id));
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      favorites = favorites.filter(movie => movie.id !== id);
    } else {
      favorites.push({ id, title, year, summary, poster, genres });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="movie">
      <div className="movie-header">
        <h3 className="movie_title">
          <Link to={`/movie/${id}`} className="movie_link">{title}</Link>
        </h3>
        <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
          ❤️
        </button>
      </div>
      <img src={poster} alt={title} />
      <div className="movie_column">
        <h5 className="movie_year">{year}</h5>
        <ul className="movie_genres">
          {genres.map((genre, index) => (
            <li key={index} className="genre">{genre}</li>
          ))}
        </ul>
        <p className="movie_summary">{summary.slice(0, 100)}...</p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
