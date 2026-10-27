const router = require('express').Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/book', async (req, res) => {
  try {
    const { userEmail, movieTitle, showTime, selectedSeats, totalAmount } = req.body;

    if (!selectedSeats || selectedSeats.length === 0) {
      return res.status(400).json({ message: "Please select at least one seat." });
    }

    const newBooking = new Booking({
      userEmail: userEmail || "guest@imovies.com",
      movieTitle,
      showTime,
      selectedSeats,
      totalAmount
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Booking confirmed successfully!", booking: savedBooking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get bookings for a user
router.get('/user/:email', async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;