const express = require ("express");
const app = express();
const cors = require ("cors");
app.use(express.json());
app.use(cors());
const noteRoutes = require('./routes/noteRoutes');

app.use('/api/notes', noteRoutes);

app.listen(4000,() => console.log("API on localhost:4000"));