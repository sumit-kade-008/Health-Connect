const express = require('express');
const router = express.Router();
const { registerHospital, getHospitals, updateBeds } = require('../controllers/hospitalController');
const { protect, restrictTo } = require('../middleware/auth');

router.post('/', protect, restrictTo('hospital_admin'), registerHospital);
router.get('/', getHospitals);
router.put('/beds', protect, restrictTo('hospital_admin'), updateBeds);

module.exports = router;
