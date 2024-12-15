const axios = require('axios');
const FLASK_BASE_URL = 'http://127.0.0.1:5000/api/v1';

// Function to call the initialize endpoint
async function initializeIndex(directory) {
    try {
        const response = await axios.post(`${FLASK_BASE_URL}/initialize`, { directory });
        console.log('Initialize Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error initializing index:', error.response ? error.response.data : error.message);
        return error;
    }
}

// Function to query the Flask API
async function queryRAG(query) {
    try {
        const response = await axios.post(`${FLASK_BASE_URL}/query`, { query });
        console.log('Query Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error querying Flask API:', error.response ? error.response.data : error.message);
        return error;
    }
}

module.exports = { initializeIndex, queryRAG };
