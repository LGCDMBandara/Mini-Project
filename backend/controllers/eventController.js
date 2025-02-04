const Event = require('../models/Event');

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events', details: error });
  }
};

// Add a new event
exports.addEvent = async (req, res) => {
  try {
    const { teamName, telno, fromTime, toTime, location, date, district, province } = req.body;

    if (!teamName || !telno || !fromTime || !toTime || !location || !date || !district || !province) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newEvent = new Event({ teamName, telno, fromTime, toTime, location, date, district, province });
    await newEvent.save();

    res.status(201).json({ message: 'Event added successfully!', event: newEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Error adding event', details: error });
  }
};


