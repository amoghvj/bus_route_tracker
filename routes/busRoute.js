// routes/BusRoute.js
const express = require('express');
const BusRoute = require('../models/BusRoute');

module.exports = () => {
    const router = express.Router();

    // DEFAULT /api/route/init – Initialize bus location
    router.post('/init', async (req, res) => {

    });

    // DEFAULT /api/route – Update location from Tracker App
    router.post('/', async (req, res) => {

    });

    // DEFAULT /api/route/ids – Get list of all bus IDs
    router.get('/ids', async (req, res) => {
        try {
            // Fetch only route_id field from all documents
            const routes = await BusRoute.find({}, { route_id: 1, _id: 0 });

            // Extract just the IDs into a plain array
            const busIds = routes.map(b => b.route_id);

            res.json(busIds);

        } catch (err) {
            console.error(err);

            res.status(500).json({ error: 'Server error' });

        }

    });

    // DEFAULT /api/route/:route_id – Get latest route data
    router.get('/:route_id', async (req, res) => {
        try {
            const latest = await BusRoute.findOne({ route_id: req.params.route_id });

            if (!latest) return res.status(404).json({ error: 'No route found' });

            res.json(latest);

        } catch (err) {
            console.error(err);

            res.status(500).json({ error: 'Server error' });

        }

    });

    return router;
}