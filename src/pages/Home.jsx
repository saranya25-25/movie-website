
import { useState, useEffect } from "react";

import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import mockMovies from "../data/mockMovies";

import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Header from "../components/Header";
import Loader from "../components/Loader";

import "../components/styles/MoviesCard.css";

/* Number of movies shown initially */
const MOVIES_INITIAL = 20;

/* Number of movies loaded when clicking Show More */
const MOVIES_PER_LOAD = 15;

function Home() {

  /* =========================
     STATE VARIABLES
  ========================= */

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

  const [user, setUser] = useState(null);

  /* =========================
     AUTH STATE
  ========================= */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout Successful");
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================
     LOAD MOVIES
  ========================= */

  useEffect(() => {
    setMovies(mockMovies);
  }, []);

  /* =========================
     SPLASH LOADER
  ========================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  /* =========================
     SHOW MORE MOVIES
  ========================= */

  const handleMoreMovies = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + MOVIES_PER_LOAD);
      setLoadingMore(false);
    }, 800);
  };

  /* =========================
     SEARCH FILTER
  ========================= */

  let filteredMovies = movies.filter((movie) =>
    movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* =========================
     SORT BY YEAR
  ========================= */

  if (sortYear === "asc") {
    filteredMovies.sort((a, b) => b.year - a.year);
  }

  if (sortYear === "desc") {
    filteredMovies.sort((a, b) => a.year - b.year);
  }

  /* =========================
     WISHLIST TOGGLE
  ========================= */

  const toggleFavorite = (movie) => {
    if (favorites.find((m) => m.id === movie.id)) {
      setFavorites(
        favorites.filter((m) => m.id !== movie.id)
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  /* =========================
     MOVIES SOURCE
  ========================= */

  const moviesToShow = showWishlist
    ? favorites
    : filteredMovies;

  const displayMovies = moviesToShow.slice(
    0,
    visibleCount
  );

  /* =========================
     UI
  ========================= */

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortYear={sortYear}
            setSortYear={setSortYear}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {user && (
            <div className="user-section">
              <h3>Welcome {user.email}</h3>

              <button
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}

          <section className="hero">
            <h1>
              Unlimited Movies, TV Shows & More
            </h1>

            <p>
              Explore your favourite Telugu,
              Bollywood and Hollywood movies.
            </p>
          </section>

          <div className="movie-count">
            Showing {displayMovies.length} Movies
          </div>

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

          {visibleCount < moviesToShow.length && (
            <div className="load-more-container">

              {loadingMore ? (
                <Loader />
              ) : (
                <button
                  className="load-more-btn"
                  onClick={handleMoreMovies}
                >
                  Show More
                </button>
              )}

            </div>
          )}

          {modalMovie && (
            <MovieModal
              movie={modalMovie}
              closeModal={() =>
                setModalMovie(null)
              }
            />
          )}

          <div className="action-buttons">
            <button
              className="wishlist-btn"
              onClick={() =>
                setShowWishlist(!showWishlist)
              }
            >
              {showWishlist
                ? "🎬 Show All Movies"
                : `❤️ Wishlist (${favorites.length})`}
            </button>
          </div>

          <footer className="footer">
            🎬 Movie Website | Built with React ❤️
          </footer>
        </>
      )}

    </div>
  );
}

export default Home;

