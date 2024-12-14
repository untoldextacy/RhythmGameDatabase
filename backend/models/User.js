// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // other fields...
});

module.exports = mongoose.model('User', UserSchema);
