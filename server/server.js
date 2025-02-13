const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeIndex, queryRAG } = require('./routes/api');
const portConfiguration = require('../src/portConfigurtion');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || portConfiguration.localPort;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/initialize', async (req, res) => {
    const { directory } = req.body;

    if (!directory) {
        return res.status(400).json({ error: 'Directory is required' });
    }

    try {
        const response = await initializeIndex(directory);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to initialize index' });
    }
});

app.post('/query', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const response = await queryRAG(query);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get query response' });
    }
});