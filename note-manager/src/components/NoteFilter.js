import { useState, useEffect } from "react";


export default function NoteFilter({ mode, setMode, setSelectedTags, theme, onToggleTheme }) {
    const [tagsString, setTagsString] = useState("");

    useEffect(() => {
        setSelectedTags(tagsString.split(",").map(t => t.trim()).filter(Boolean));
    }, [tagsString]);

    return (
        <>
                <div className="filters">
                    <label>
                        <input
                            type="radio"
                            checked={mode === "all"}
                            onChange={() => setMode("all")}
                        /> All
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={mode === "selected"}
                            onChange={() => setMode("selected")}
                        /> Selected
                    </label>
                    <div className="tag-picker">
                        <input
                            placeholder="Tags (comma separated)"
                            value={tagsString}
                            onChange={(e) =>
                                setTagsString(e.target.value)
                            }
                            disabled={mode !== "selected"}
                        />
                    </div>
                </div>

        </>
    )
}


