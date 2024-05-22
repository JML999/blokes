const fs = require('fs');
const path = require('path');
const express = require('express');
const serverless = require('serverless-http');

const app = express();

let metadata;
try {
    const metadataPath = path.resolve(__dirname, 'metadata.json');
    const data = fs.readFileSync(metadataPath, 'utf8');
    metadata = JSON.parse(data);
    console.log("Metadata loaded:", metadata);
} catch (error) {
    console.error("Error reading metadata:", error);
    metadata = []; // Assign an empty array to avoid undefined errors
}

app.get('/.netlify/functions/metadata/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Request for metadata with id: ${id}`);
    
    console.log(`Metadata array: ${JSON.stringify(metadata, null, 2)}`);
    const metadataItem = metadata.find(item => item["File Name"] === `${id}.json`);
    
    if (metadataItem) {
        console.log(`Found metadata: ${JSON.stringify(metadataItem)}`);
        res.json(metadataItem);
    } else {
        console.log(`Metadata not found for id: ${id}`);
        res.status(404).json({ error: "Metadata not found" });
    }
});

module.exports.handler = serverless(app);





