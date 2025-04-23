const express = require('express');
const { signup, login, changePassword, sendOtp, updateUserProfile, 
    uploadProfilePicture, uploadMiddleware, getUserData, verifyAdmin, 
    getAllUsers, getUserById, getUsers, getFilteredUsersCount,
    sendEmail} = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/changePassword', changePassword);
router.post('/send-otp', sendOtp);
router.post('/update-profile',authMiddleware,uploadMiddleware, updateUserProfile);
router.post('/upload', uploadMiddleware, uploadProfilePicture);
router.get('/user', authMiddleware, getUserData);
router.get('/get-all-users', authMiddleware, verifyAdmin, getAllUsers);
router.get('/get-user/:id', authMiddleware, verifyAdmin, getUserById);
router.get('/fetch', getUsers);
router.get('/count', getFilteredUsersCount);
router.post('/sendEmail', sendEmail);

module.exports = router;
