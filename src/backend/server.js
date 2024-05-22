const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Example metadata for minted tokens
const mintedMetadata = {
  1: {
    name: "Token 1",
    description: "Description for token 1",
    image: "ipfs://Qm.../1.png"
  },
  // Add metadata for other minted tokens...
};

// Placeholder metadata for non-minted tokens
const placeholderMetadata = {
  name: "Placeholder",
  description: "This token has not been revealed yet.",
  image: "ipfs://Qm.../placeholder.png"
};

app.get('/metadata/:tokenId', (req, res) => {
  const tokenId = req.params.tokenId;
  if (mintedMetadata[tokenId]) {
    res.json(mintedMetadata[tokenId]);
  } else {
    res.json(placeholderMetadata);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
