const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000; // Change this if port 3000 is in use

const API_KEY = 'AIzaSyANRNCyR4VBdaw_0xHIHajA5-kgHX-OTQI'; // Your Google Books API key

// Middleware to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API route to fetch books based on a search query
app.get('/api/books', async (req, res) => {
    console.log('Received request to /api/books with query:', req.query);
    const query = req.query.q || 'fiction'; // Default to 'fiction' if no query provided
    try {
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=5`
        );
        console.log('Books API response:', response.data);
        res.json(response.data.items || []);
    } catch (error) {
        console.error('Error fetching books:', error.response?.status, error.response?.data);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch books',
            details: error.response?.data
        });
    }
});

// API route to fetch book details by ID
app.get('/api/book/:id', async (req, res) => {
    console.log('Received request to /api/book/:id with ID:', req.params.id);
    const id = req.params.id;
    try {
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}?key=${API_KEY}`
        );
        console.log('Book details API response:', response.data);
        if (!response.data.volumeInfo) {
            throw new Error('No volume info found for this ID');
        }
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching book details:', error.response?.status, error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: `Failed to fetch book: ${error.message}`,
            details: error.response?.data
        });
    }
});

// Catch-all route for unmatched requests (to debug 404s)
app.use((req, res) => {
    console.log('Unmatched route hit:', req.method, req.url);
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});