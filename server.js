require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// API endpoint สำหรับ frontend
app.get('/api/spreadsheets', async (req, res) => {
    const range = req.query.range;
    const sheetId = process.env.SHEET_ID;
    const apiKey = process.env.API_KEY;

    if (!range) {
        return res.status(400).json({ error: 'Missing range' });
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from Google Sheets' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
