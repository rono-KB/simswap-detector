const mongoose = require('mongoose');

const SimEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true },
  eventType: {
    type: String,
    enum: ['sim_change', 'new_device_login', 'otp_failure', 'location_anomaly', 'normal'],
    required: true
  },
  device: { type: String, default: 'Unknown' },
  location: { type: String, default: 'Unknown' },
  ipAddress: { type: String, default: 'Unknown' },
  riskScore: { type: Number, default: 0 },
  flagged: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SimEvent', SimEventSchema);