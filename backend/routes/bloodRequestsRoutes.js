const express = require('express');
const { createBloodRequest, getAllBloodRequests, getBloodRequestById, deleteBloodRequestById } = require('../controllers/bloodRequestController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

router.post('/', createBloodRequest);
router.get('/getall', getAllBloodRequests);
router.get('/get/:id', getBloodRequestById); // Changed from /get-all/:id to /get/:id
router.delete('/:id', deleteBloodRequestById);

module.exports = router;