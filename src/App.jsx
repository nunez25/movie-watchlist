import Layout from "./layouts/Layout"; 
import MovieList from "./components/MovieList"; 
import AddMovieForm from "./components/AddMovieForm"; 
import FilterBar from "./components/FilterBar"; 
import SummaryBar from "./components/SummaryBar"; 
import SearchBar from "./components/SearchBar"; 
import { useEffect, useState } from "react";
import initialMovies from "./data/movies"; 
import { searchMovies, toWatchlistMovie } from "./api/tmdb";
import SearchResults from "./components/SearchResults";
 
export default function App() { 
  // Fix 1: Pass initialMovies directly as an array, not inside an object 
  const [movies, setMovies] = useState(initialMovies); 
  const [filter, setFilter] = useState("all"); 

  // NEW state — for TMDB search
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const visibleMovies = movies.filter((movie) => { 
    if (filter === "watched") return movie.watched; 
    if (filter === "unwatched") return !movie.watched; 
    return true; 
  }); 

  useEffect(() => {
    if (!searchTerm) return; // don't fetch on empty search

    let isCancelled = false;

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const movies = await searchMovies(searchTerm);

        if (!isCancelled) {
          setResults(movies);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Failed to fetch movies. Try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      isCancelled = true; // ignore stale response if user searches again
    };
  }, [searchTerm]);
 
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
    setSearchTerm(query);
  };

  const handleAddFromSearch = (tmdbMovie) => {
    // Avoid adding duplicates
    if (movies.some((m) => m.id === tmdbMovie.id)) return;

    const watchlistMovie = toWatchlistMovie(tmdbMovie);
    setMovies([...movies, watchlistMovie]);
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

      <SearchResults
        results={results}
        isLoading={isLoading}
        error={error}
        onAdd={handleAddFromSearch}
      />
 
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