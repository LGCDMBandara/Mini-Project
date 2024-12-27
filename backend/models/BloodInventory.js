const mongoose = require('mongoose');

const bloodInventorySchema = new mongoose.Schema({
  bloodType: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('BloodInventory', bloodInventorySchema);
