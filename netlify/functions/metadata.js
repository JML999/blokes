const fs = require('fs');
const path = require('path');

const metadataPath = path.resolve(__dirname, 'metadata.json'); // Ensure this path is correct

let metadata;

try {
    metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    console.log("Metadata loaded:", metadata);
} catch (error) {
    console.error("Error reading metadata:", error);
}

const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/.netlify/functions/metadata/:id', (req, res) => {
    const id = req.params.id;
    const metadataItem = metadata.find(item => item["File Name"] === `${id}.json`);
    if (metadataItem) {
        res.json(metadataItem);
    } else {
        res.status(404).json({ error: "Metadata not found" });
    }
});

module.exports.handler = serverless(app);



