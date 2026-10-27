const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// 1. ADD A NEW MOVIE
router.post('/add', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json({ message: "Movie successfully add ho gayi! 🎬", newMovie });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET ALL MOVIES
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;