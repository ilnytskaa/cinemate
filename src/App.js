import React from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Favorites from './Favorites'; 
import MovieDetail from './MovieDetail';

function App() {
  return (
    <HashRouter>
      <div>
        {/* Панель навігації */}
        <nav className="navbar">
          <div>
            <Link to="/">🎬 Головна</Link>
            <Link to="/favorites">❤️ Улюблені</Link>
          </div>
          <div>
            <Link to="/about">ℹ️ Про нас</Link>
          </div>
        </nav>

        {/* Маршрути */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
