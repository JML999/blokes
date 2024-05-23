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
    console.log(`Received request for metadata ID: ${id}`);
    const item = metadata[id];
    if (item) {
        console.log(`Serving metadata for ID: ${id}`);
        res.json(item);
    } else {
        console.log(`Metadata not found for ID: ${id}`);
        res.json({
            "name": "Unrevealed NFT",
            "description": "This NFT has not been revealed yet.",
            "image": "https://example.com/placeholder.png"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});