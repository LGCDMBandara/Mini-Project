const Blood = require('../models/Blood');
const BloodInventory = require('../models/BloodInventory');

// Get all blood types and quantities
exports.getBloodInventory = async (req, res) => {
  try {
    const bloodInventory = await BloodInventory.find({});
    res.status(200).json(bloodInventory);
} catch (err) {
    res.status(500).json({ message: 'Error fetching blood inventory', error: err });
}
};

// Add blood to inventory
exports.addBlood = async (req, res) => {
   // console.log("Body:", req.body);
    const { teamName, date, bloodType, quantity } = req.body;

    try {
        // Convert quantity to an integer
        const parsedQuantity = parseInt(quantity, 10);

        // Check if the conversion was successful
        if (isNaN(parsedQuantity)) {
            return res.status(400).json({ message: 'Quantity must be a valid number' });
        }

        // Create a new blood donation record
        const bloodEntry = new Blood({
            teamName,
            date,
            bloodType,
            quantity: parsedQuantity,
            status: 'donate',
        });
        await bloodEntry.save();

        // Update inventory for the specific blood type
        const inventory = await BloodInventory.findOneAndUpdate(
            { bloodType },
            { $inc: { quantity: parsedQuantity } }, // Use the parsed integer
            { new: true, upsert: true } // Create a new record if it doesn't exist
        );

        res.status(200).json({ message: 'Blood donation recorded and inventory updated successfully', inventory });
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


exports.analyticdTypeVise = async (req, res) => {
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
}


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

