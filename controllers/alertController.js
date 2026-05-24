const Alert = require('../models/Alert');

// GET ALL ALERTS FOR LOGGED IN USER
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('simEventId');
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ALERT COUNT
exports.getAlertCount = async (req, res) => {
  try {
    const count = await Alert.countDocuments({ userId: req.user.id });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE AN ALERT
exports.deleteAlert = async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alert deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};