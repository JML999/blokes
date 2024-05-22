const fs = require('fs');
const path = require('path');
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Use __dirname to ensure the correct path resolution
const metadataFilePath = path.resolve(__dirname, 'metadata.json');

let metadata = [];
try {
    console.log("Reading metadata from:", metadataFilePath);
    const rawData = fs.readFileSync(metadataFilePath, 'utf-8');
    metadata = JSON.parse(rawData);
    console.log("Metadata loaded:", metadata);
} catch (error) {
    console.error("Error reading metadata:", error);
}

router.get('/metadata/:id', (req, res) => {
    const id = req.params.id;
    console.log("Request for metadata with id:", id);

    const entry = metadata.find(item => item['File Name'] === `${id}.json`);
    if (entry) {
        console.log("Metadata found:", entry);
        res.json(entry);
    } else {
        console.log("Metadata not found for id:", id);
        res.status(404).json({ error: "Metadata not found" });
    }
});

app.use('/.netlify/functions/metadata', router);

module.exports.handler = serverless(app);





