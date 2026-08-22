import Layout from "./layouts/Layout";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";
import { useState, useEffect } from "react";
import initialMovies from "./data/movies";

export default function App() {
  // Task 1: Load movies from localStorage
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    return saved ? JSON.parse(saved) : initialMovies;
  });

  // Task 3: Load the saved filter from localStorage
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  // Task 1: Save movies to localStorage whenever movies change
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // Task 2: Update the browser tab title
  useEffect(() => {
    document.title = `Movie Watchlist (${movies.length})`;
  }, [movies.length]);

  // Task 3: Save the active filter to localStorage
  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  // Filter the movies
  const visibleMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched;
    if (filter === "unwatched") return !movie.watched;
    return true;
  });

  // Toggle watched status
  const handleToggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };

  // Delete one movie
  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // Task 4: Clear all movies
  const handleClearAll = () => {
    if (confirm("Clear your entire watchlist? This cannot be undone.")) {
      setMovies([]);
    }
  };

  // Add a new movie
  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Watchlist</h1>

        <p className="opacity-70">
          A collection of movies I've watched and want to watch.
        </p>
      </div>

      {/* Summary + Clear All */}
      <div className="flex items-center justify-between mb-6">
        <SummaryBar movies={movies} />

        <button
          className="btn btn-error btn-sm"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>

      {/* Add Movie Form */}
      <AddMovieForm onAddMovie={handleAddMovie} />

      {/* Filter Bar */}
      <FilterBar
        currentFilter={filter}
        onChangeFilter={setFilter}
      />

      {/* Movie List */}
      <MovieList
        movies={visibleMovies}
        onToggleWatched={handleToggleWatched}
        onDelete={handleDeleteMovie}
      />
    </Layout>
  );
}