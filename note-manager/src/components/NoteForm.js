import { useState } from "react";

export default function NoteForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagsString, setTagsString] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        if (!content.trim()) return;
        onAdd({ title: title.trim(), content: content.trim(),
             tags: tagsString.split(",").map(t => t.trim()).filter(Boolean) });

        setTitle("");
        setContent("");
        setTagsString("");
    };

    return (
        <form className="card form" onSubmit={submit}>

            <input
                placeholder="Note title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />


            <input
                placeholder="Note content *"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <input
                placeholder="Tags (comma separated)"
                value={tagsString}
                onChange={(e) =>
                    setTagsString(e.target.value)
                }
            />

            <button type="submit">Add</button>

        </form>




    )
}