const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: { type: String, unique: true },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
      console.log('Original Password:', this.password);
      this.password = await bcrypt.hash(this.password, 10); 
      console.log('Hashed Password:', this.password); 
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
