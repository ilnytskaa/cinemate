import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import './Home.css';

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteMovies(favorites);
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>❤️ Мої улюблені фільми</h2>
      {favoriteMovies.length > 0 ? (
        <div className="movies">
          {favoriteMovies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.poster}
              genres={movie.genres}
            />
          ))}
        </div>
      ) : (
        <h3 style={{ textAlign: 'center' }}>У вас поки немає улюблених фільмів...</h3>
      )}
    </div>
  );
}

export default Favorites;
