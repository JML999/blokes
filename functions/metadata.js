// src/backend/server.js
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

let metadata;
try {
    const metadataPath = path.resolve(__dirname, '../../functions/metadata.json');
    const data = fs.readFileSync(metadataPath, 'utf8');
    metadata = JSON.parse(data);
    console.log("Metadata loaded:", metadata);
} catch (error) {
    console.error("Error reading metadata:", error);
    metadata = {}; // Assign an empty object to avoid undefined errors
}

app.get('/metadata/:id', (req, res) => {
    const id = req.params.id;
    const item = metadata[id];
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: "Metadata not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






