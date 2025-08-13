// server.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import bus location route
const busLocationRoute = require('./routes/bus');
app.use('/api/bus', busLocationRoute());

// Import bus stop location route
const busStopLocationRoute = require('./routes/busStop');
app.use('/api/bus_stop', busStopLocationRoute());

// Import bus stop location route
const busRoute = require('./routes/busRoute');
app.use('/api/route', busRoute());

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

server.listen(PORT, HOST, () => {
    console.log(`Server running at ${HOST}, on port ${PORT}`);
});
