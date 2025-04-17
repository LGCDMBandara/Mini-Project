const mongoose = require('mongoose');
const Blood = require('./models/Blood');
const bloodData = require('./bloodData.json');

// Connect to MongoDB (removed deprecated options)
mongoose.connect('mongodb+srv://bloodconnectsl:xVf9kGBJJtdPWhAP@bloodconnect.r4rdu.mongodb.net/?retryWrites=true&w=majority&appName=bloodConnect')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// Insert data
async function insertData() {
  try {
    const dataWithoutIds = bloodData.map(({ _id, __v, ...rest }) => rest);
    await Blood.insertMany(dataWithoutIds);
    
    console.log('Data inserted successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error inserting data:', err);
    mongoose.connection.close();
  }
}

insertData();