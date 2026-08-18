export default function FilterBar({ currentFilter, onChangeFilter }) {
    const filters = ["all", "watched", "unwatched"];
    
    return (
    <div className="flex gap-2 mb-6">
        {filters.map((f) => (
            <button
                key={f}
                onClick={() => onChangeFilter(f)}
                className={`btn btn-sm capitalize ${
                    currentFilter === f ? "btn-primary" : "btn-ghost"
                }`}
            >
                {f}
            </button>
        ))}
    </div>
    );
}