const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config();

const app = express();
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = 'quote-app';
const COLLECTION_NAME = 'quotes';

let db;

async function startServer() {
  try {
    const client = await MongoClient.connect(MONGO_URL, {
      retryWrites: false,
      maxPoolSize: 1
    });
    console.log('Connected to MongoDB');
    db = client.db(DB_NAME);

    // Middleware
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    // Get all quotes
    app.get('/api/quotes', async (req, res) => {
      try {
        const quotes = await db.collection(COLLECTION_NAME).find({}).toArray();
        res.json(quotes);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get random quote
    app.get('/api/random-quote', async (req, res) => {
      try {
        const quotes = await db.collection(COLLECTION_NAME).find({}).toArray();
        if (quotes.length === 0) {
          return res.json({ text: 'No quotes yet. Add one!' });
        }
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        res.json(random);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Add a quote
    app.post('/api/quotes', async (req, res) => {
      try {
        const { text, author } = req.body;
        const newQuote = {
          text,
          author,
          dateAdded: new Date()
        };
        const result = await db.collection(COLLECTION_NAME).insertOne(newQuote);
        res.json(newQuote);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Delete a quote
    app.delete('/api/quotes/:id', async (req, res) => {
      try {
        const { ObjectId } = require('mongodb');
        const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
