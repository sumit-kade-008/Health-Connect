const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    icu: { type: Number, default: 0 },
    oxygen: { type: Number, default: 0 },
    general: { type: Number, default: 0 },
    ventilator: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Bed', bedSchema);
