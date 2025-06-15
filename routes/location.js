// routes/location.js
const express = require('express');
const Location = require('../models/Location');

module.exports = () => {
    const router = express.Router();

    // DEFAULT /api/location/init – Initialize bus location
    router.post('/init', async (req, res) => {
        const { bus_id, latitude, longitude } = req.body;

        if (!bus_id || !latitude || !longitude) return res.status(400).json({ error: 'Missing data' });

        try {
            const exists = await Location.findOne({ bus_id });

            if (exists) return res.status(409).json({ error: 'Bus already initialized' });

            const new_location = new Location({ bus_id, latitude, longitude, timestamp: Date.now() });
            await new_location.save();

            res.status(201).json({ message: 'Bus initialized' });

        } catch (err) {
            console.error(err);

            res.status(500).json({ error: 'Server error' });

        }

    });

    // DEFAULT /api/location – Update location from Tracker App
    router.post('/', async (req, res) => {
        const { bus_id, latitude, longitude } = req.body;

        if (!bus_id || !latitude || !longitude) return res.status(400).json({ error: 'Missing data' });

        try {
            const updated = await Location.findOneAndUpdate(
                { bus_id },
                { latitude, longitude, timestamp: Date.now() },
                { upsert: false, new: true }
            );

            if (!updated) return res.status(404).json({ error: 'Bus not initialized' });

            res.status(200).json({ message: 'Location updated' });

        } catch (err) {
            console.error(err);

            res.status(500).json({ error: 'Server error' });

        }

    });

    // DEFAULT /api/location/:bus_id – Get latest location for a bus
    router.get('/:bus_id', async (req, res) => {
        try {
            const latest = await Location.findOne({ bus_id: req.params.bus_id })
                .sort({ timestamp: -1 });

            //to eliminate duplicatyes

            if (!latest) return res.status(404).json({ error: 'No location found' });

            res.json(latest);

        } catch (err) {
            console.error(err);

            res.status(500).json({ error: 'Server error' });

        }

    });

    return router;
}