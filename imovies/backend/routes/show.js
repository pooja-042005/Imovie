const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatreName: { type: String, required: true },
  location: { type: String, required: true },
  timings: [{ type: String, required: true }],
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Show', showSchema);