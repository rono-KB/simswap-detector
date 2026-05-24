const SimEvent = require('../models/SimEvent');
const Alert = require('../models/Alert');
const User = require('../models/User');
const { analyzeEvent } = require('../detection/anomalyEngine');
const sendEmail = require('../utils/emailAlert');
const sendSMS = require('../utils/smsAlert');

// LOG A NEW SIM EVENT
exports.logEvent = async (req, res) => {
  const { eventType, device, location, ipAddress, newDevice } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { riskScore, reasons, flagged } = analyzeEvent({ eventType, newDevice });

    const simEvent = new SimEvent({
      userId: user._id,
      phone: user.phone,
      eventType,
      device: device || 'Unknown',
      location: location || 'Unknown',
      ipAddress: ipAddress || req.ip,
      riskScore,
      flagged
    });
    await simEvent.save();

    if (flagged) {
      const alertMessage = `ALERT: Suspicious activity detected. Phone: ${user.phone}. Event: ${eventType}. Risk Score: ${riskScore}/100. Reasons: ${reasons.join(', ')}. Time: ${new Date().toLocaleString('en-KE')}. If this was not you, contact your operator immediately.`;

      await sendEmail(user.email, 'SIM Swap Alert Detected', alertMessage);
      await sendSMS(user.phone, `SIM SWAP ALERT: Suspicious activity. Risk Score: ${riskScore}/100. Reasons: ${reasons.join(', ')}. Contact Safaricom if not you.`);

      const alert = new Alert({
        userId: user._id,
        simEventId: simEvent._id,
        alertType: 'both',
        message: alertMessage,
        delivered: true
      });
      await alert.save();
    }

    res.json({
      message: flagged ? 'Suspicious activity detected! Alert sent.' : 'Event logged. No threat detected.',
      riskScore,
      flagged,
      reasons,
      eventId: simEvent._id
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET ALL EVENTS
exports.getEvents = async (req, res) => {
  try {
    const events = await SimEvent.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET FLAGGED EVENTS
exports.getFlaggedEvents = async (req, res) => {
  try {
    const events = await SimEvent.find({ userId: req.user.id, flagged: true }).sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};