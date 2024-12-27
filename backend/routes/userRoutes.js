const express = require('express');
const { signup, login, changePassword, sendOtp } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/changePassword', changePassword);
router.post('/send-otp', sendOtp);
//sd;fkjls;ldkf;lkj

module.exports = router;
