const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true } // pdf, image
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
