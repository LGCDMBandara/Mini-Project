const mongoose = require('mongoose');
const bloodData = require('../bloodData.json');

const BloodSchema = new mongoose.Schema({
  _id: String,
  teamName: String,
  date: Date,
  bloodType: String,
  quantity: Number,
  status: String,
  __v: Number,
});

const Blood = mongoose.model('Blood', BloodSchema);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return Blood.insertMany(bloodData);
  })
  .then(() => {
    console.log('Data inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error:', err);
    mongoose.connection.close();
  });



  // node utils/seedDatabase.js
