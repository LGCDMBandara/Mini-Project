const mongoose = require('mongoose');

const bloodSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    type: {
        type: String,
        enum: ['donation', 'request'],
        required: true
    },
    bloodBank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('BloodBase', bloodSchema);