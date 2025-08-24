import { useEffect, useState } from "react";
import './App.css';
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import NoteItem from "./components/NoteItem";
import NoteSearch from "./components/NoteSearch";


const API = "/api/notes";


function App() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

  }, [theme]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(API);
        setNotes(await response.json());
      } catch { setErr("failed to load notes"); }
      finally { setLoading(false); }
    })();
  }, []);

  useEffect(() => {
    if (!query) return;
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/search?q=${query}`);
        setNotes(await response.json());
      } catch { setErr("failed to load notes"); }
      finally { setLoading(false); }
    })();
  }, [query]);

  const addNote = async (payload) => {
    setErr("");
    try {
      const response = await fetch(API, { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw 0;
      const note = await response.json();
      setNotes(((p) => [...p, note]));
    } catch { setErr("Could not add note") };
  };
  
  const updateNote = async (id,patch) => {
    setErr("");
    try {
      const res = await fetch(`${API}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      if (!res.ok) throw 0;
      const u = await res.json();
      setNotes((p) => p.map((n) => n.id === id ? u : n));
    } catch { setErr("Could not update note"); }
  };

  const deleteNote = async (id) => {
    setErr("");
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      console.log(res);
      if (res.status !== 204) throw 0;
      setNotes((p) => p.filter((n) => n.id !== id));
    } catch { setErr("Could not delete note"); }
  };

  return (
    <div className="App">
      <h1>Note Manager</h1>

      <NoteForm onAdd={addNote}></NoteForm>
      <NoteSearch query={query} onQueryChange={setQuery} ></NoteSearch>

      {loading ? (
        <p className="muted">Loading…</p>
      ) : notes.length === 0 ? (
        <p className="muted">Add Note</p>
      ) : (
        <NoteList
          items={notes}
          renderItem={(n) => (
            <NoteItem
              key={n.id}
              note={n}
              onDelete={() => deleteNote(n.id)}
              onSave={(patch) => updateNote(n.id, patch)}
            />
          )}
        />
      )}

    </div>
  );
}

export default App;
