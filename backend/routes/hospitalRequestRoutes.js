// routes/hospitalRequestRoutes.js
const express = require('express');
const router = express.Router();
const {
    createBloodRequest,
    getHospitals,
    getBloodBanks,
    getLocations,
    getBloodRequestsByBloodBank,
    sendEmail
} = require('../controllers/hospitalRequestController.js');
const { protect, restrictTo } = require('../middlewares/authMiddlewareRequest.js');

router.use(protect);

router
    .route('/')
    .post(restrictTo('Hospital'), createBloodRequest);

router.get('/hospitals', getHospitals);
router.get('/blood-banks', getBloodBanks);
router.get('/locations', getLocations);
router.get('/blood-bank-requests', restrictTo('BloodBank'), getBloodRequestsByBloodBank);
router.post('/send-email', restrictTo('BloodBank'), sendEmail);

module.exports = router;