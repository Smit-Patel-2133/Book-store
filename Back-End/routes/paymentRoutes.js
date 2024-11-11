const express = require('express');
const { getSessionId, verifyPayment, saveOrder} = require('../controllers/paymentController');

const router = express.Router();

router.post('/sessionId', getSessionId);
router.post('/verify', verifyPayment);
router.post('/order_details', saveOrder);
module.exports = router;
