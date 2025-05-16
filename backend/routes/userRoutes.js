// userRoutes.js
const express = require('express');
const {
  signup,
  login,
  changePassword,
  sendOtp,
  updateUserProfile,
  getUserData,
  verifyAdmin,
  getAllUsers,
  getUserById,
  getUsers,
  getFilteredUsersCount,
  sendEmail,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware'); // Define this separately

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/changePassword', changePassword);
router.post('/send-otp', sendOtp);
router.post('/update-profile', authMiddleware, uploadMiddleware, updateUserProfile);
router.get('/user', authMiddleware, getUserData);
router.get('/get-all-users', authMiddleware, verifyAdmin, getAllUsers);
router.get('/get-user/:id', authMiddleware, verifyAdmin, getUserById);
router.get('/fetch', getUsers);
router.get('/count', getFilteredUsersCount);
router.post('/sendEmail', sendEmail);

module.exports = router;