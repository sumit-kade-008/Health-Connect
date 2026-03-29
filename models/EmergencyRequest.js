const mongoose = require('mongoose');

const emergencyRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['blood', 'bed', 'general'], required: true },
    status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
    location: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema);
