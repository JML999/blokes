const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = 'https://hychain.calderaexplorer.xyz/api/v2';

app.use(cors());
app.use(express.json());

// Fetch token transfers for a specific address and token contract
const fetchTokenTransfers = async (address, tokenAddress) => {
    try {
        const url = `${BASE_URL}/addresses/${address}/token-transfers`;
        const response = await axios.get(url, { params: { token_address: tokenAddress } });
        return response.data;
    } catch (error) {
        console.error('Error fetching token transfers:', error);
        return [];
    }
};

// Endpoint to update and return the owned token transfers
app.get('/update-owned-tokens', async (req, res) => {
    const { ownerAddress, tokenAddress } = req.query;
    try {
        // Fetch token transfers
        const tokenTransfers = await fetchTokenTransfers(ownerAddress, tokenAddress);
        // Respond with the fetched token transfers
        res.json({ tokenTransfers });
    } catch (error) {
        console.error('Error updating owned tokens:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



/*
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware to enable CORS
app.use(cors());

// Define API base URL
const BASE_URL = 'https://hychain.calderaexplorer.xyz/api/v2';

// Middleware to parse JSON request body
app.use(express.json());

// Endpoint to fetch token instances by address hash
app.get('/tokens/:address_hash/instances', async (req, res) => {
    try {
        const { address_hash } = req.params;
        const url = `${BASE_URL}/tokens/${address_hash}/instances`;
        
        // Make GET request to API endpoint
        const response = await axios.get(url);
        const instances = response.data;
        
        // Return instances as response
        res.json(instances);
    } catch (error) {
        // Handle errors
        console.error('Error fetching token instances:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

*/
