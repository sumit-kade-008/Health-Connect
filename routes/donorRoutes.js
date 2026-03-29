const express = require('express');
const router = express.Router();
const { registerDonor, getDonors } = require('../controllers/donorController');
const { protect, restrictTo } = require('../middleware/auth');

router.post('/', protect, restrictTo('donor', 'patient', 'hospital_admin'), registerDonor);
router.get('/', getDonors);

module.exports = router;
