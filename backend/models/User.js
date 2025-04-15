const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  fname: { type: String },
  lname: { type: String },
  tnumber: { type: String },
  nic: { type: String },
  province: { type: String },
  district: { type: String },
  city: { type: String },
  pcode: { type: String },
  address: { type: String },
  gender: { type: String },
  occupation: { type: String },
  dob: { type: Date },
  weight: { type: Number },
  bloodgroup: { type: String },
  donate: { type: String },
  lastDonationDate: { type: Date },
  healthInfo: { type: [String], default: [] },
  medications: { type: [String], default: [] },
  surgeryHistory: { type: [String], default: [] },
  profilePicture: { type: String }, 
  otp: {type: String},
  otpExpires: {type: Date}

});


userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    console.log('Original Password:', this.password);
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Hashed Password:', this.password);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
