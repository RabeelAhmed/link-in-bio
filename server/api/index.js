const express = require('express');
const cors = require('cors');
const connectDB = require('../lib/connectDB');
require('dotenv').config();

const app = express();

// CORS configuration — allow Vercel domains + localhost
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      origin.includes('.vercel.app') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1')
    ) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to DB before handling each request (cached for serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection error:', err.message);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

// Routes
const linksRouter = require('../routes/links');
app.use('/api/links', linksRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Link in Bio API is running! Visit /api/links to see links.');
});

module.exports = app;
