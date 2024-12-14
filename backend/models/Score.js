// models/Score.js

const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  score: { type: Number, required: true },
  rank: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
});

module.exports = mongoose.model('Score', scoreSchema);
