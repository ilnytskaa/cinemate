import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
    error: null,
    selectedGenre: 'All', 
  };

  getMovies = async () => {
    try {
      const response = await axios.get('https://yts.mx/api/v2/list_movies.json?sort_by=rating');
      const movies = response.data.data.movies;

      if (!movies || movies.length === 0) {
        throw new Error('Фільми не знайдено');
      }

      this.setState({ movies, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies, selectedGenre, error } = this.state;

    const genres = ['All', ...new Set(movies.flatMap(movie => movie.genres))];

    const filteredMovies = selectedGenre === 'All'
      ? movies
      : movies.filter(movie => movie.genres.includes(selectedGenre));

    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Завантаження...</span>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div> 
        ) : (
          <div>
            <div className="genre-filter">
              <select
                value={selectedGenre}
                onChange={(e) => this.setState({ selectedGenre: e.target.value })}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
                </div>
                
            <div className="movies">
              {filteredMovies.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Home;
