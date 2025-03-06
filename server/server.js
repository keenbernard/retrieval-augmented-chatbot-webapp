const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeIndex, queryRAG } = require('./routes/api');
const portConfiguration = require('../src/portConfigurtion');
const fs = require("fs");
const https = require("https");
const path = require('path');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || portConfiguration.localPort;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start the server http
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

// Start the server https
// const certificates = {
//     middlewareTest: {
//         pfx: fs.readFileSync(path.join(__dirname, 'certificates', 'wildcard_belizetelemedia_net-2024.pfx')),
//         passphrase: '!D1giAcc355*'
//     }}
// const httpsServer = https.createServer(certificates.middlewareTest, app);
// httpsServer.listen(PORT);

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
    const { query, role } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        console.log("User Role is:", role)
        const response = await queryRAG(query);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get query response' });
    }
});