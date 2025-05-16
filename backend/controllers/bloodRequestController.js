const BloodRequest = require('../models/BloodRequest');
const mongoose = require('mongoose');

exports.createBloodRequest = async (req, res) => {
    try {
        const newRequest = new BloodRequest(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json({ request: savedRequest });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllBloodRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find();
        res.status(200).json({ requests });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBloodRequestById = async (req, res) => {
    try {
        // Validate ObjectId
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid request ID' });
        }

        const request = await BloodRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ error: 'Blood request not found' });
        }
        res.status(200).json({ request }); // Changed from { user: request } to { request }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBloodRequestById = async (req, res) => {
    try {
        // Validate ObjectId
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid request ID' });
        }

        const deletedRequest = await BloodRequest.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({ error: 'Blood request not found' });
        }
        res.status(200).json({ message: 'Blood request deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};