const MedicalRecord = require('../models/MedicalRecord');
const path = require('path');
const fs = require('fs');

// @desc    Upload a medical record
// @route   POST /api/records
exports.uploadRecord = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        const record = await MedicalRecord.create({
            userId: req.user.id,
            title: req.body.title || 'Untitled Record',
            fileUrl: `/uploads/${req.file.filename}`,
            fileType: req.file.mimetype.split('/')[1]
        });

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's medical records
// @route   GET /api/records
exports.getRecords = async (req, res) => {
    try {
        const records = await MedicalRecord.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a medical record
// @route   DELETE /api/records/:id
exports.deleteRecord = async (req, res) => {
    try {
        const record = await MedicalRecord.findById(req.params.id);

        if (!record) return res.status(404).json({ message: 'Record not found' });

        // Make sure user owns the record
        if (record.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Delete file from filesystem if it exists
        const filePath = path.join(__dirname, '..', record.fileUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await MedicalRecord.findByIdAndDelete(req.params.id);
        res.json({ message: 'Record removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
