const Hospital = require('../models/Hospital');
const Bed = require('../models/Bed');

// @desc    Register a hospital
// @route   POST /api/hospitals
exports.registerHospital = async (req, res) => {
    const { name, city, address } = req.body;

    try {
        const hospitalExists = await Hospital.findOne({ userId: req.user.id });
        if (hospitalExists) return res.status(400).json({ message: 'Hospital profile already created for this user' });

        const hospital = await Hospital.create({
            userId: req.user.id,
            name,
            city,
            address
        });
        
        // Create an empty bed record initialized to 0
        await Bed.create({ hospitalId: hospital._id });
        
        res.status(201).json(hospital);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search hospitals & beds
// @route   GET /api/hospitals
exports.getHospitals = async (req, res) => {
    const { city } = req.query;
    let query = {};
    if (city) query.city = new RegExp(city, 'i');

    try {
        const hospitals = await Hospital.find(query).populate('userId', 'phone email');
        
        // We need to fetch beds for each hospital
        const hospitalWithBeds = await Promise.all(hospitals.map(async (h) => {
            const beds = await Bed.findOne({ hospitalId: h._id });
            return {
                ...h._doc,
                beds
            };
        }));

        res.json(hospitalWithBeds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update hospital bed availability
// @route   PUT /api/hospitals/beds
exports.updateBeds = async (req, res) => {
    const { icu, oxygen, general, ventilator } = req.body;

    try {
        const hospital = await Hospital.findOne({ userId: req.user.id });
        if (!hospital) return res.status(404).json({ message: 'Hospital profile not found for this user' });

        let beds = await Bed.findOne({ hospitalId: hospital._id });
        if (!beds) {
            beds = await Bed.create({ hospitalId: hospital._id, icu, oxygen, general, ventilator });
        } else {
            beds.icu = icu !== undefined ? icu : beds.icu;
            beds.oxygen = oxygen !== undefined ? oxygen : beds.oxygen;
            beds.general = general !== undefined ? general : beds.general;
            beds.ventilator = ventilator !== undefined ? ventilator : beds.ventilator;
            await beds.save();
        }

        res.json(beds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
