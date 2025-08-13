// models/BusLocation.js
const mongoose = require('mongoose');

const LatLon = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
}, { _id: false })

const locationSchema = new mongoose.Schema({
    route_id: { type: String, required: true, unique: true },
    coordinates: { type: [LatLon], default: [] },
    bus_stops: { type: [String], default: [] }
});

module.exports = mongoose.model('BusRoute', locationSchema);
