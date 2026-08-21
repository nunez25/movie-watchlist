export default function MovieCard({
  id,
  title,
  poster,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
  onDelete,
}) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={poster}
          alt={title}
          className="w-full h-80 object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {title}

          {rating >= 8 && (
            <div className="badge badge-warning">
              Top Rated
            </div>
          )}

          {/* TODO: props */}
          {/* TODO: conditional — show a "Top Rated" badge (badge-warning) if rating >= 8 */}
        </h2>

        <p className="text-sm opacity-70">
          {genre} • {year}
          {/* TODO: props — display like "Sci-Fi • 2010" */}
        </p>

        <p className="text-sm">
          ⭐ {rating}
          {/* TODO: props — rating */}
        </p>

        <div className="card-actions justify-end mt-2">
          <button
            onClick={() => onToggleWatched(id)}
            className={`badge cursor-pointer ${
              watched ? "badge-success" : "badge-ghost"
            }`}
          >
            {watched ? "Watched ✓" : "Unwatched"}
          </button>

          <button
            onClick={() => onDelete(id)}
            className="btn btn-error btn-xs"
          >
            Delete
          </button>

          {/* TODO: conditional — if watched, show "Watched ✓" (badge badge-success);
              otherwise show "Unwatched" (badge badge-ghost) */}
        </div>
      </div>
    </div>
  );
}