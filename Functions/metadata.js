const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const path = require('path');
const app = express();
const router = express.Router();

console.log("Starting server...");

// Load the metadata file
const metadataFilePath = path.resolve(__dirname, 'metadata.json');
let metadata = [];
try {
  metadata = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
  console.log("Metadata loaded:", metadata);
} catch (error) {
  console.error("Error loading metadata:", error);
}

// Placeholder metadata for non-minted tokens
const placeholderMetadata = {
  name: "Placeholder",
  description: "This token has not been revealed yet.",
  image: "ipfs://Qm.../placeholder.png"
};

router.get('/metadata/:tokenId', (req, res) => {
  const tokenId = req.params.tokenId;
  console.log(`Received request for token ID: ${tokenId}`);
  const tokenMetadata = metadata.find(item => item["File Name"] === `${tokenId}.json`);
  if (tokenMetadata) {
    console.log(`Serving metadata for token ID: ${tokenId}`);
    res.redirect(tokenMetadata["Direct Download Link"]);
  } else {
    console.log(`Token ID: ${tokenId} not found. Serving placeholder metadata.`);
    res.json(placeholderMetadata);
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.send('Server is working!');
});

app.use('/.netlify/functions/server', router);

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

module.exports = app;
module.exports.handler = serverless(app);

