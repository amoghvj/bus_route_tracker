// models/BusLocation.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    bus_id: { type: String, required: true, unique: true },
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now },
    route_id: String
});

module.exports = mongoose.model('BusLocation', locationSchema);
