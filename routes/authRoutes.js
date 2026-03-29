const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile, getUsers } = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.get('/users', protect, restrictTo('hospital_admin'), getUsers);

module.exports = router;
