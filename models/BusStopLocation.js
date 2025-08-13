// models/BusStopLocation.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    bus_stop_id: { type: String, required: true, unique: true },
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('BusStopLocation', locationSchema);
