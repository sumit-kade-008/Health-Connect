const express = require('express');
const router = express.Router();
const { createEmergencyRequest, getEmergencyRequests } = require('../controllers/emergencyController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createEmergencyRequest);
router.get('/', getEmergencyRequests); 

module.exports = router;
