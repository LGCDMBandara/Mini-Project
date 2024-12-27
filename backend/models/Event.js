const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  telno: { type: String, required: true },
  fromTime: { type: String, required: true },
  toTime: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true }, 
  district: { type: String, required: true },
  province: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
