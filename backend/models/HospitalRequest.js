const mongoose = require('mongoose');

const hospitalRequestSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: [true, 'Patient name is required'],
        trim: true
    },
    purpose: {
        type: String,
        required: [true, 'Purpose is required'],
        trim: true
    },
    bloodUnits: {
        type: Number,
        required: [true, 'Blood units are required'],
        min: [1, 'Blood units must be at least 1']
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required'],
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    needDate: {
        type: Date,
        required: [true, 'Need date is required'],
        validate: {
            validator: function (value) {
                return value >= new Date();
            },
            message: 'Need date must be today or in the future'
        }
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, 'Hospital is required']
    },
    bloodBank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, 'Blood bank is required']
    },
    province: {
        type: String,
        required: [true, 'Province is required'],
        trim: true
    },
    district: {
        type: String,
        required: [true, 'District is required'],
        trim: true
    },
    details: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, 'Creator is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('HospitalRequest', hospitalRequestSchema);