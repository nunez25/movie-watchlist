import Layout from "./layouts/Layout";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import { useState } from "react";
import initialMovies from "./data/movies";

export default function App() {
  const[movies, setMovies] = useState({initialMovies});

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

const handleAddMovie = (newMovie) => {
  setMovies([...movies, newMovie]);
};
};
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <p className="opacity-70">
          A collection of movies I've watched and want to watch.
        </p>
      </div>
      <AddMovieForm onAddMovie={handleAddMovie} />
      <MovieList movies={movies} />
      <MovieList movies={movies} onToggleWatched={handleToggleWatched} />
      <MovieList movies={movies} onDelete={handleDeleteMovie} />
    </Layout>
  );
}
