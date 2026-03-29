const express = require('express');
const router = express.Router();
const { uploadRecord, getRecords, deleteRecord } = require('../controllers/recordController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', protect, upload.single('file'), uploadRecord);
router.get('/', protect, getRecords);
router.delete('/:id', protect, deleteRecord);

module.exports = router;
