const fs = require('fs');
const path = require('path');
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

let metadata;
try {
    const metadataPath = path.resolve(__dirname, 'metadata.json');
    const data = fs.readFileSync(metadataPath, 'utf8');
    metadata = JSON.parse(data);
    console.log("Metadata loaded:", metadata);
} catch (error) {
    console.error("Error reading metadata:", error);
    metadata = {}; // Assign an empty object to avoid undefined errors
}

router.get('/metadata/:id', (req, res) => {
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

app.use('/.netlify/functions', router);

module.exports.handler = serverless(app);




