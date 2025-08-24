import { useState } from "react";

export default function NoteItem({ note,onSave,onDelete }) {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [tagsString, setTagsString] = useState(note.tags.join(", "));

    const save = () => {
        onSave({ title: title.trim() || note.title, content: content.trim() || note.content,
             tags: tagsString.split(",").map(t => t.trim()).filter(Boolean)  });
        setEdit(false);
    };

    return (
        <div className={`card note ${note.completed ? "done" : ""} ${edit ? "editing" : ""}`}>


            {edit ? (
                <>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input value={content} onChange={(e) => setContent(e.target.value)} />
                    <input
                        placeholder="Tags (comma separated)"
                        value={tagsString}
                        onChange={(e) =>
                            setTagsString(e.target.value)
                        }
                    />
                </>
            ) : (
                <>
                    <h3>{note.title}</h3>
                    {(note.content) && <p className="muted">{note.content}</p>}
                    {(note.tags) && <p className="muted">{note.tags.join(", ")}</p>}
                </>
            )}



            <div className="actions">
                {edit ? (
                    <>
                        <button onClick={save}>Save</button>
                        <button onClick={() => { setEdit(false); }}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => { setEdit(true);}}>Edit</button>
                        <button className="danger" onClick={onDelete}>Delete</button>
                    </>

                )}

            </div>

        </div>
    )








}