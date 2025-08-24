import { useId } from "react";
export default function NoteSearch({ value, onQueryChange }) {
  const id = useId();
  return (
    <div className="search-wrap">
      <label htmlFor={id} className="sr-only"></label>
      <input
        id={id}
        className="search"
        placeholder="Search…"
        value={value}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  );
}