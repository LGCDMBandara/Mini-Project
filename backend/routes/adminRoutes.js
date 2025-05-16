const express = require('express');
const router = express.Router();
const { addAdmin, getBloodBankAdmins, login, removeBlood, addBlood, getBloodRecords, analyzeBlood, getAdminById } = require('../controllers/adminController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/add', addAdmin);
router.get('/', getBloodBankAdmins);
router.post('/login', login);
router.post('/request', authMiddleware, removeBlood);
router.post('/donate', authMiddleware, addBlood);
router.get('/blood-records', authMiddleware, getBloodRecords);
router.get('/bloodAnalize', authMiddleware, analyzeBlood);
router.get('/:id', getAdminById);
router.get('/bloodAnalize/:id', authMiddleware, analyzeBlood);

module.exports = router;