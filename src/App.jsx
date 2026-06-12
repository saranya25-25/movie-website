import { useState, useEffect } from "react";
import "./App.css";

import mockMovies from "./data/mockMovies";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import Header from "./components/Header";
import Loader from "./components/Loader";

import "./components/styles/MoviesCard.css";

const MOVIES_INITIAL = 20;
const MOVIES_PER_LOAD = 15;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(MOVIES_INITIAL);
  const [modalMovie, setModalMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortYear, setSortYear] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load movies
  useEffect(() => {
    setMovies(mockMovies);
  }, []);

  // Initial loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Show More with loader (FIXED)
  const handleMoreMovies = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + MOVIES_PER_LOAD);
      setLoadingMore(false);
    }, 800);
  };

  // Filter
  let filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort
  if (sortYear === "asc") {
    filteredMovies.sort((a, b) => b.year - a.year);
  } else if (sortYear === "desc") {
    filteredMovies.sort((a, b) => a.year - b.year);
  }

  // Wishlist toggle
  const toggleFavorite = (movie) => {
    if (favorites.find((m) => m.id === movie.id)) {
      setFavorites(favorites.filter((m) => m.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  // Movies source
  const moviesToShow = showWishlist ? favorites : filteredMovies;

  const displayMovies = moviesToShow.slice(0, visibleCount);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* INITIAL LOADER */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* HEADER */}
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortYear={sortYear}
            setSortYear={setSortYear}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* HERO */}
          <section className="hero">
            <h1>Unlimited Movies, TV Shows & More</h1>
            <p>Explore your favourite Telugu, Bollywood and Hollywood movies.</p>
          </section>

          {/* COUNT */}
          <div className="movie-count">
            Showing {displayMovies.length} Movies
          </div>

          {/* MOVIES LIST */}
          <div className="movie-list">
            {displayMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                openModal={setModalMovie}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {/* SHOW MORE */}
          {visibleCount < moviesToShow.length && (
            <div className="load-more-container">

              {loadingMore ? (
                <Loader />
              ) : (
                <button
                  onClick={handleMoreMovies}
                  className="load-more-btn"
                  disabled={loadingMore}
                >
                  Show More
                </button>
              )}

            </div>
          )}

          {/* MODAL */}
          {modalMovie && (
            <MovieModal
              movie={modalMovie}
              closeModal={() => setModalMovie(null)}
            />
          )}

          {/* WISHLIST BUTTON */}
          <div className="action-buttons">
            <button
              className="wishlist-btn"
              onClick={() => setShowWishlist(!showWishlist)}
            >
              {showWishlist
                ? "🎬 Show All Movies"
                : `❤️ Wishlist (${favorites.length})`}
            </button>
          </div>

          {/* FOOTER */}
          <footer className="footer">
            🎬 Movie Website | Built with React ❤️
          </footer>
        </>
      )}
    </div>
  );
};

export default App;