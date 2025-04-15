const express = require('express');
const { createBloodRequest, getAllBloodRequests, getBloodRequestById, deleteBloodRequestById } = require('../controllers/bloodRequestController');

const router = express.Router();

router.post('/', createBloodRequest);
router.get('/getall', getAllBloodRequests);
router.get('/get-all/:id', getBloodRequestById); 
router.delete('/:id', deleteBloodRequestById);

module.exports = router;
