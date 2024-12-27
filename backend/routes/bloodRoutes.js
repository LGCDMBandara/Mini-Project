const express = require('express');
const { addBlood, removeBlood, getAPlusBlood, getANegativeBlood, getOPlusBlood, getONegativeBlood, getABPlusBlood, getABNegativeBlood, getBPlusBlood, getBNegativeBlood, getBloodQuantities } = require('../controllers/bloodController');

const router = express.Router();

router.post('/donate', addBlood);
router.get('/bloodAnalize', getBloodQuantities);
router.post('/request', removeBlood);
router.get('/a-positive/last-week', getAPlusBlood);
router.get('/a-negative/last-week', getANegativeBlood);
router.get('/o-positive/last-week', getOPlusBlood);
router.get('/o-negative/last-week', getONegativeBlood);
router.get('/ab-positive/last-week', getABPlusBlood);
router.get('/ab-negative/last-week', getABNegativeBlood);
router.get('/b-positive/last-week', getBPlusBlood);
router.get('/b-negative/last-week', getBNegativeBlood);

module.exports = router;
