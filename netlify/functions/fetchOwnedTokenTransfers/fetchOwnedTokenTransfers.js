const axios = require('axios');
const cors = require('cors');

exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Check for GET request
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: 'Method Not Allowed',
        };
    }

    // Parse query parameters
    const { ownerAddress, tokenAddress } = event.queryStringParameters;

    // Fetch token transfers for a specific address and token contract
    try {
        const BASE_URL = 'https://hychain.calderaexplorer.xyz/api/v2';
        const url = `${BASE_URL}/addresses/${ownerAddress}/token-transfers`;
        const response = await axios.get(url, { params: { token_address: tokenAddress } });
        const tokenTransfers = response.data;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ tokenTransfers }),
        };
    } catch (error) {
        console.error('Error fetching token transfers:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
