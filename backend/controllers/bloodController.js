const Blood = require('../models/Blood.js');


exports.getBloodQuantities = async (req, res) => {
    try {
        // Aggregate the total quantities for each blood type and status
        const bloodQuantities = await Blood.aggregate([
            {
                $group: {
                    _id: { bloodType: "$bloodType", status: "$status" },
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $group: {
                    _id: "$_id.bloodType",
                    quantities: {
                        $push: {
                            status: "$_id.status",
                            totalQuantity: "$totalQuantity",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    bloodType: "$_id",
                    quantities: 1,
                },
            },
        ]);

        res.status(200).json({ message: 'Blood quantities retrieved successfully', data: bloodQuantities });
    } catch (err) {
        console.error('Error retrieving blood quantities:', err);
        res.status(500).json({ message: 'Error retrieving blood quantities', error: err });
    }
};


// Add blood to inventory
exports.addBlood = async (req, res) => {
    const { teamName, date, bloodType, quantity } = req.body;

    try {
        const parsedQuantity = parseInt(quantity, 10);

        if (isNaN(parsedQuantity)) {
            return res.status(400).json({ message: 'Quantity must be a valid number' });
        }

        const bloodEntry = new Blood({
            teamName,
            date,
            bloodType,
            quantity: parsedQuantity,
            status: 'donate',
        });
        await bloodEntry.save();

    } catch (err) {
        console.error('Error saving donation record:', err);
        res.status(500).json({ message: 'Error saving donation record', error: err });
    }
};


// Remove blood from inventory
exports.removeBlood = async (req, res) => {
  const { teamName, date, bloodType, quantity } = req.body;
    try {
        const inventory = await BloodInventory.findOne({ bloodType });
        if (!inventory || inventory.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient blood quantity in inventory' });
        }

        const bloodEntry = new Blood({
            teamName,
            date,
            bloodType,
            quantity,
            status: 'request'
        });
        await bloodEntry.save();

        inventory.quantity -= quantity;
        await inventory.save();

        res.status(200).json({ message: 'Blood request recorded and inventory updated successfully', inventory });
    } catch (err) {
        res.status(500).json({ message: 'Error saving request record', error: err });
    }
};


// Analiysis 
exports.getAPlusBlood = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const bloodEntries = await Blood.find({
            bloodType: 'A+',
            date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 });

        res.status(200).json(bloodEntries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching A+ blood entries', error: err });
    }
};

exports.getANegativeBlood = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const bloodEntries = await Blood.find({
            bloodType: 'A-',
            date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 });

        res.status(200).json(bloodEntries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching A- blood entries', error: err });
    }
};

exports.getOPlusBlood = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const bloodEntries = await Blood.find({
            bloodType: 'O+',
            date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 });

        res.status(200).json(bloodEntries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching O+ blood entries', error: err });
    }
};

exports.getONegativeBlood = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const bloodEntries = await Blood.find({
            bloodType: 'O-',
            date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 });

        res.status(200).json(bloodEntries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching O- blood entries', error: err });
    }
};

exports.getABPlusBlood = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const bloodEntries = await Blood.find({
            bloodType: 'AB+',
            date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 });

        res.status(200).json(bloodEntries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching AB+ blood entries', error: err });
    }
};

exports.getABNegativeBlood = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const bloodEntries = await Blood.find({
            bloodType: 'AB-',
            date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 });

        res.status(200).json(bloodEntries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching AB- blood entries', error: err });
    }
};

exports.getBPlusBlood = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const bloodEntries = await Blood.find({
            bloodType: 'B+',
            date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 });

        res.status(200).json(bloodEntries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching B+ blood entries', error: err });
    }
};

exports.getBNegativeBlood = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const bloodEntries = await Blood.find({
            bloodType: 'B-',
            date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 });

        res.status(200).json(bloodEntries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching B- blood entries', error: err });
    }
};

exports.BloodData = async (req, res) => {
    try {
        const bloodData = await Blood.aggregate([
            {
                $group: {
                    _id: '$bloodType',
                    totalQuantity: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'donate'] }, '$quantity', { $multiply: ['$quantity', -1] }]
                        }
                    }
                }
            },
            {
                $project: {
                    bloodType: '$_id',
                    quantity: '$totalQuantity',
                    _id: 0
                }
            }
        ]);

        res.status(200).json(bloodData);
    } catch (error) {
        console.error('Error fetching blood data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


