import Layout from "./layouts/Layout"; 
import MovieList from "./components/MovieList"; 
import AddMovieForm from "./components/AddMovieForm"; 
import FilterBar from "./components/FilterBar"; 
import SummaryBar from "./components/SummaryBar"; 
import SearchBar from "./components/SearchBar"; 
import { useState } from "react"; 
import initialMovies from "./data/movies"; 
import { searchMovies, toWatchlistMovie } from "./api/tmdb"; 
 
export default function App() { 
  // Fix 1: Pass initialMovies directly as an array, not inside an object 
  const [movies, setMovies] = useState(initialMovies); 
  const [filter, setFilter] = useState("all"); 
 
  const visibleMovies = movies.filter((movie) => { 
    if (filter === "watched") return movie.watched; 
    if (filter === "unwatched") return !movie.watched; 
    return true; 
  }); 
 
  const handleToggleWatched = (id) => { 
    setMovies( 
      movies.map((movie) => 
        movie.id === id ? { ...movie, watched: !movie.watched } : movie 
      ) 
    ); 
  }; 
 
  const handleDeleteMovie = (id) => { 
    setMovies(movies.filter((movie) => movie.id !== id)); 
  }; // Fix 2: Properly closed handleDeleteMovie function here 
 
  const handleAddMovie = (newMovie) => { 
    setMovies([...movies, newMovie]); 
  }; 

  // Task 2: Handle search when the Search button is submitted
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };
 
  return ( 
    <Layout> 
      <div className="mb-6"> 
        <h1 className="text-3xl font-bold">My Watchlist</h1> 
        <p className="opacity-70"> 
          A collection of movies I've watched and want to watch. 
        </p> 
      </div> 
 
      <SummaryBar movies={movies} /> 
 
      <SearchBar onSearch={handleSearch} /> 
 
      <AddMovieForm onAddMovie={handleAddMovie} /> 
 
      <FilterBar 
        currentFilter={filter} 
        onChangeFilter={setFilter} 
      /> 
 
      {/* Fix 3: Render MovieList once and pass all props together */} 
      <MovieList 
        movies={visibleMovies} 
        onToggleWatched={handleToggleWatched} 
        onDelete={handleDeleteMovie} 
      /> 
    </Layout> 
  ); 
}