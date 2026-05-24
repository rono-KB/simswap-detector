const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  simEventId: { type: mongoose.Schema.Types.ObjectId, ref: 'SimEvent' },
  alertType: { type: String, enum: ['sms', 'email', 'both'], default: 'both' },
  message: { type: String, required: true },
  delivered: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', AlertSchema);