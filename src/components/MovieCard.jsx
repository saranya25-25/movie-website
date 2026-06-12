import React from 'react';

const MovieCard = ({
  movie,
  openModal,
  favorites,
  toggleFavorite
}) => {

  const isFavorite =
    favorites?.some((m) => m.id === movie.id);

  return (
    <div
      className="movie-card"
      onClick={() => openModal(movie)}
    >

      <button
        className="favorite-btn"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(movie);
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <img
        src={movie.poster}
        alt={movie.title}
      />

      <h3>{movie.title}</h3>

      <p>{movie.rating}</p>

    </div>
  );
};

export default MovieCard;