import { useState } from "react";
const AddMovieForm = ({ onAddMovie }) => {
const [title, setTitle] = useState("");
const [poster, setPoster] = useState("");
const [genre, setGenre] = useState("");
const [year, setYear] = useState("");
const [rating, setRating] = useState(5);
const handleSubmit = (e) => {
e.preventDefault();
onAddMovie({
id: Date.now(),
title,
poster,
genre,
year: Number(year),
rating: Number(rating),
watched: false,
});
// TODO: reset all inputs back to their initial values
    setTitle("");
    setPoster("");
    setGenre("");
    setYear("");
    setRating(5);
};
return (
<form onSubmit={handleSubmit}className="p-4 bg-base-200 rounded-lg mb-6 space-y-4">
{/* TODO: inputs bound to value + onChange */}
<h2 className="text-xl font-bold">Add a Movie</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
        required
    />

    <input
        type="text"
        placeholder="Poster Image URL"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        className="input input-bordered w-full"
    />

    <input
        type="text"
        placeholder="Genre (e.g. Action, Sci-Fi)"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="input input-bordered w-full"
    />

    <input
        type="number"
        placeholder="Release Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="input input-bordered w-full"
    />
</div>

<div>
    <label className="block text-sm font-semibold mb-1">
        Rating: {rating}/10
    </label>
    <input
        type="range"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="range range-primary"
    />
</div>
<button type="submit" className="btn btn-primary">Add Movie</button>
</form>
);
};
export default AddMovieForm;