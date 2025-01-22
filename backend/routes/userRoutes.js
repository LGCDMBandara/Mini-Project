const express = require('express');
const { signup, login, changePassword, sendOtp, updateUserProfile, uploadProfilePicture, uploadMiddleware, getUserData } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/changePassword', changePassword);
router.post('/send-otp', sendOtp);
router.post('/update-profile',authMiddleware,uploadMiddleware, updateUserProfile);
router.post('/upload', uploadMiddleware, uploadProfilePicture);
router.get('/user',authMiddleware, getUserData);

module.exports = router;
