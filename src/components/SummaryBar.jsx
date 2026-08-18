export default function SummaryBar({ movies }) {
    const total = movies.length;
    const watched = movies.filter((m) => m.watched).length;
    const unwatched = movies.filter((m) => !m.watched).length;

    return (
        <div className="flex gap-4 p-4 bg-base-200 rounded-lg mb-6 text-sm font-semibold">
            <div>
                Total: <span className="text-primary">{total}</span>
            </div>
            <div>
                Watched: <span className="text-success">{watched}</span>
            </div>
            <div>
                Unwatched: <span className="text-warning">{unwatched}</span>
            </div>
        </div>
    );
}