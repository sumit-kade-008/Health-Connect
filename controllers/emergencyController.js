const EmergencyRequest = require('../models/EmergencyRequest');
const Donor = require('../models/Donor');
const Hospital = require('../models/Hospital');
const Bed = require('../models/Bed');

// @desc    Create emergency request
// @route   POST /api/emergency
exports.createEmergencyRequest = async (req, res) => {
    const { type, location } = req.body;

    try {
        const request = await EmergencyRequest.create({
            userId: req.user.id,
            type,
            location,
            status: 'pending'
        });

        // Basic matching logic based on type
        let matches = {};
        if (type === 'blood') {
            matches.donors = await Donor.find({ city: new RegExp(location, 'i'), isAvailable: true }).populate('userId', 'name phone email');
        } else if (type === 'bed') {
            const hospitals = await Hospital.find({ city: new RegExp(location, 'i') }).populate('userId', 'phone email address');
            matches.hospitals = await Promise.all(hospitals.map(async (h) => {
                const beds = await Bed.findOne({ hospitalId: h._id });
                return { ...h._doc, beds };
            }));
        }

        res.status(201).json({ request, matches });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all emergency requests
// @route   GET /api/emergency
exports.getEmergencyRequests = async (req, res) => {
    try {
        const requests = await EmergencyRequest.find().populate('userId', 'name phone').sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
