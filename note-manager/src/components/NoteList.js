export default function NoteList({ items, renderItem }) {
    return (
        <div className="grid">
            {items.map((it, i) => (
                <div key={it ? `${it.id}-${i}` : `empty-${i}`} className="slide">
                    {it ? renderItem(it) : <div className="muted">No Note</div>}
                </div>
            ))}
        </div>
    );
}