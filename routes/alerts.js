const express = require('express');
const router = express.Router();
const { getAlerts, getAlertCount, deleteAlert } = require('../controllers/alertController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getAlerts);
router.get('/count', auth, getAlertCount);
router.delete('/:id', auth, deleteAlert);

module.exports = router;