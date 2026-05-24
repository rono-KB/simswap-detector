const express = require('express');
const router = express.Router();
const { logEvent, getEvents, getFlaggedEvents } = require('../controllers/monitorController');
const auth = require('../middleware/authMiddleware');

router.post('/event', auth, logEvent);
router.get('/events', auth, getEvents);
router.get('/flagged', auth, getFlaggedEvents);

module.exports = router;