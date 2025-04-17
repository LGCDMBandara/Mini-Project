const mongoose = require('mongoose');

const bloodSchema = new mongoose.Schema({
  teamName: String,
  date: Date,
  bloodType: String,
  quantity: Number,
  status: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Blood', bloodSchema);