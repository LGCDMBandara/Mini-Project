const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['BloodBank', 'Hospital'],
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: function () { return this.role === 'BloodBank'; }
    },
    district: {
        type: String,
        required: function () { return this.role === 'BloodBank'; }
    },
    phone: {
        type: String,
        required: function () { return this.role === 'BloodBank'; }
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
