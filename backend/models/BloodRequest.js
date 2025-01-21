const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
    gname: { type: String, required: true },
    purpose: { type: String, required: true },
    bloodUnits: { type: Number, required: true },
    bloodGroup: { type: String, required: true },
    needDate: { type: Date, required: true },
    hospitalName: { type: String, required: true },
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    details: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
