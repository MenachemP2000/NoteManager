const express = require('express');
const cors = require("cors");
const router = express.Router();

let notes = [];
let id = 1;

router.get('/', (req, res) => res.json(notes));

router.get('/search', (req, res) => {
    const q = String(req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: "missing q" });

    const q1 = q.toLowerCase();

    const results = notes.filter(x =>
        x.title.toLowerCase().includes(q1) ||
        x.content.toLowerCase().includes(q1)
    );
    
    return res.json(results);
});

router.post('/', (req, res) => {
    const title = (req.body.title || "").trim();
    if (!title) return res.status(400).json({ error: "no title proivded" });
    const content = (req.body.content || "");
    if (!content) return res.status(400).json({ error: "no content proivded" });

    const note = {
        id: id++,
        title,
        content,
        createdAt: new Date(),
        tags: req.body.tags
    }

    notes.push(note);

    res.status(201).json(note);

});

router.put('/:id', (req, res) => {
    const title = (req.body.title || "").trim();
    if (!title) return res.status(400).json({ error: "no title proivded" });
    const content = (req.body.content || "");
    if (!content) return res.status(400).json({ error: "no content proivded" });


    const note = notes.find(x => x.id == req.params.id);
    if (!note) return res.status(404).json({ error: " note not found" });

    note.title = req.body.title;
    note.content = req.body.content;
    note.tags = req.body.tags;

    res.json(note);

});

router.delete('/:id', (req, res) => {
    const before = notes.length;
    notes = notes.filter(x => x.id != req.params.id);
    if (notes.length === before) return res.status(404).json({ error: " note not found" });
    res.status(204).end();
})

module.exports = router;
