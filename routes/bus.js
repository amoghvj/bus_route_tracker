// routes/busLocation.js
const express = require('express');
const BusLocation = require('../models/BusLocation');

module.exports = () => {
    const router = express.Router();

    // DEFAULT /api/bus/init – Initialize bus location
    router.post('/init', async (req, res) => {
        // console.log(req.body)

        const { bus_id, latitude, longitude, timestamp } = req.body;

        if (!bus_id || !latitude || !longitude) return res.status(400).json({ error: 'Missing data' });

        try {
            const exists = await BusLocation.findOne({ bus_id });

            if (exists) return res.status(400).json({ error: 'Bus already initialized' });

            const new_location = new BusLocation({ bus_id, latitude, longitude, timestamp: timestamp || Date.now() });
            await new_location.save();

            res.status(201).json({ message: 'Bus initialized' });

        } catch (err) {
            console.error(err);

            res.status(500).json({ error: 'Server error' });

        }

    });

    // DEFAULT /api/bus – Update location from Tracker App
    router.post('/', async (req, res) => {
        // console.log(req.body)

        const { bus_id, latitude, longitude, timestamp } = req.body;

        if (!bus_id || !latitude || !longitude) return res.status(400).json({ error: 'Missing data' });

        try {
            const updated = await BusLocation.findOneAndUpdate(
                { bus_id },
                { latitude, longitude, timestamp: timestamp || Date.now() },
                { upsert: false, new: true }
            );

            if (!updated) return res.status(404).json({ error: 'Bus not initialized' });

            res.status(200).json({ message: 'Location updated' });

        } catch (err) {
            console.error(err);

            res.status(500).json({ error: 'Server error' });

        }

    });

    // DEFAULT /api/bus/ids – Get list of all bus IDs
    router.get('/ids', async (req, res) => {
        try {
            // Fetch only bus_id field from all documents
            const buses = await BusLocation.find({}, { bus_id: 1, _id: 0 });
            console.log(buses);

            // Extract just the IDs into a plain array
            const busIds = buses.map(b => b.bus_id);

            res.json(busIds);

        } catch (err) {
            console.error(err);

            res.status(500).json({ error: 'Server error' });

        }

    });

    // DEFAULT /api/bus/:bus_id – Get latest location for a bus
    router.get('/:bus_id', async (req, res) => {
        try {
            const latest = await BusLocation.findOne({ bus_id: req.params.bus_id })
                .sort({ timestamp: -1 });

            //to eliminate duplicates

            if (!latest) return res.status(404).json({ error: 'No location found' });

            res.json(latest);

        } catch (err) {
            console.error(err);

            res.status(500).json({ error: 'Server error' });

        }

    });

    return router;
}