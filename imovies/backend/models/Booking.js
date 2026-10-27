const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional agar guest booking ho
  userEmail: { type: String, required: true },
  movieTitle: { type: String, required: true },
  showTime: { type: String, required: true },
  selectedSeats: { type: [String], required: true },
  totalAmount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);