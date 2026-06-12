import React, { use } from 'react'
import { useState,useEffect } from 'react'
import "./App.css"
import mockMovies from "./data/mockMovies";
import MovieCard from './components/MovieCard';
import "./components/styles/MoviesCard.css";
import MovieModal from './components/MovieModal';
import Header from './components/Header';
const MOVIES_INITIAL=20;
const MOVIES_PER_LOAD=10;
const App = () => {
  const [movies,setMovies]=useState([]);
  const [visibleCount,setVisibleCount]=useState(MOVIES_INITIAL);
  const [modalMovie,setModalMovie]=useState(null);
  const [searchTerm,setSearchTerm]=useState("");
  const [sortYear,setSortYear]=useState(null);
  //  console.log(searchTerm);
const [darkMode,setDarkMode]=useState(false);
const [favorites, setFavorites] = useState([]);
  useEffect(()=>{
  setMovies(mockMovies);
  },[]);
  const handleMoreMovies=()=>{
setVisibleCount((prev)=>prev+MOVIES_PER_LOAD);
  };
  const filteredMovies=movies.filter((movie)=>movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
  if(sortYear==='asc'){
    filteredMovies.sort((a,b)=>b.year-a.year);
  }
  else if(sortYear==='desc'){
    filteredMovies.sort((a,b)=>a.year-b.year);
  }

  // const [favorites, setFavorites] = useState([]);
const [showWishlist, setShowWishlist] = useState(false);
const moviesToShow = showWishlist
  ? favorites
  : filteredMovies;

const displayMovies =
  moviesToShow.slice(0, visibleCount);
const toggleFavorite = (movie) => {
  if (favorites.find((m) => m.id === movie.id)) {
    setFavorites(favorites.filter((m) => m.id !== movie.id));
  } else {
    setFavorites([...favorites, movie]);
  }
};
  return (
    <div className={darkMode?'app dark':'app'}>


      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortYear={sortYear} setSortYear={setSortYear} darkMode={darkMode} setDarkMode={setDarkMode}/>

<section className="hero">
    <h1>Unlimited Movies, TV Shows & More</h1>
    <p>Explore your favourite Telugu, Bollywood and Hollywood movies.</p>
</section>
<div className="movie-count">
  Showing {moviesToShow.length} Movies
</div>
      <div className='movie-list'>
       {
        displayMovies.map((movie)=>(
         <MovieCard
  key={movie.id}
  movie={movie}
  openModal={setModalMovie}
  favorites={favorites}
  toggleFavorite={toggleFavorite}
/>
        ))
       }
      </div>
     {
      visibleCount<movies.length&&(
         <div className='load-more-container'>
        <button onClick={handleMoreMovies}className='load-more-btn'>Show More</button>
      </div>
      )
     }
   {
 modalMovie &&
 <MovieModal
    movie={modalMovie}
    closeModal={() => setModalMovie(null)}
 />
}
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

<footer className="footer">
  🎬 Movie Website | Built with React ❤️
</footer>

</div>
)
   
}


export default App;
