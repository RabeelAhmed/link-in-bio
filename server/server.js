const express = require('express');
const cors = require('cors');
const connectDB = require('./lib/connectDB');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Routes
const linksRouter = require('./routes/links');
app.use('/api/links', linksRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Link in Bio API is running! Visit /api/links to see links.');
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to connect to DB:', err.message);
    process.exit(1);
  });
}

module.exports = app;
