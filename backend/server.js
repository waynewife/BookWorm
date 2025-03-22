const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Debug the MONGO_URI
console.log('MONGO_URI:', process.env.MONGO_URI);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  preferences: {
    readingLevel: { type: String, default: 'beginner' },
    fontPreference: { type: String, default: 'default' },
  },
});

const User = mongoose.model('User', userSchema);

// Reading List Schema
const readingListSchema = new mongoose.Schema({
  email: { type: String, required: true },
  bookId: { type: String, required: true },
  title: String,
  authors: [String],
  cover: String,
});

const ReadingList = mongoose.model('ReadingList', readingListSchema);

// Routes

// Fetch books from Google Books API
app.get('/api/books', async (req, res) => {
  const query = req.query.q || 'fiction';
  const readingLevel = req.query.readingLevel || 'beginner';
  let adjustedQuery = query;

  // Adjust the query based on reading level
  if (readingLevel === 'beginner') {
    adjustedQuery += ' inauthor:"Dr. Seuss"'; // Example: Beginner books
  } else if (readingLevel === 'intermediate') {
    adjustedQuery += ' inauthor:"J.K. Rowling"'; // Example: Intermediate books
  } else if (readingLevel === 'advanced') {
    adjustedQuery += ' inauthor:"George Orwell"'; // Example: Advanced books
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${adjustedQuery}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );
    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// User login (mock login for now)
app.post('/api/login', async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Update user preferences
app.post('/api/preferences', async (req, res) => {
  const { email, readingLevel, fontPreference } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { preferences: { readingLevel, fontPreference } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// Add to reading list
app.post('/api/reading-list', async (req, res) => {
  const { email, book } = req.body;
  try {
    const readingListItem = await ReadingList.create({ email, ...book });
    res.json(readingListItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to reading list' });
  }
});

// Get reading list
app.get('/api/reading-list', async (req, res) => {
  const { email } = req.query;
  try {
    const readingList = await ReadingList.find({ email });
    res.json(readingList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reading list' });
  }
});

// Remove from reading list
app.delete('/api/reading-list', async (req, res) => {
  const { email, bookId } = req.body;
  try {
    await ReadingList.deleteOne({ email, bookId });
    res.json({ message: 'Book removed from reading list' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from reading list' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));