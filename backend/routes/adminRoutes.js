const express = require('express');
const router = express.Router();
const { addAdmin, getBloodBankAdmins, login } = require('../controllers/adminController');

router.post('/add', addAdmin);
router.get('/', getBloodBankAdmins);
router.post('/login', login);

module.exports = router;