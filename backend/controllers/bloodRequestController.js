const BloodRequest = require('../models/BloodRequest');

exports.createBloodRequest = async (req, res) => {
    try {
        const newRequest = new BloodRequest(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllBloodRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find();
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBloodRequestById = async (req, res) => {
    try {
        const request = await BloodRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ error: 'Request not found' });
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBloodRequestById = async (req, res) => {
    try {
        const deletedRequest = await BloodRequest.findByIdAndDelete(req.params.id);
        if (!deletedRequest) return res.status(404).json({ error: 'Request not found' });
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

