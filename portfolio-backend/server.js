// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Initialize express app
const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Allow us to accept JSON data in the body

// A simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});
// --- ADD THESE LINES ---
// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));
// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});