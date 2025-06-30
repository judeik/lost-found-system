const mongoose = require('mongoose');

// backend/models/newsletterModel.js
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
