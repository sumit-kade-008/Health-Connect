const Donor = require('../models/Donor');

// @desc    Register user as donor
// @route   POST /api/donors
exports.registerDonor = async (req, res) => {
    const { bloodGroup, city } = req.body;

    try {
        const donorExists = await Donor.findOne({ userId: req.user.id });
        if (donorExists) return res.status(400).json({ message: 'User is already registered as a donor' });

        const donor = await Donor.create({
            userId: req.user.id,
            bloodGroup,
            city,
            isAvailable: true
        });
        res.status(201).json(donor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get donors (search)
// @route   GET /api/donors
exports.getDonors = async (req, res) => {
    const { bloodGroup, city } = req.query;
    
    let query = { isAvailable: true };
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (city) query.city = new RegExp(city, 'i'); // Case insensitive search

    try {
        const donors = await Donor.find(query).populate('userId', 'name email phone');
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
