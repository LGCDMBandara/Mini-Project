const express = require('express');
const { addEvent, getEvents} = require('../controllers/eventController');

const router = express.Router();

router.post('/add', addEvent);
router.get('/fetch', getEvents);

module.exports = router;
