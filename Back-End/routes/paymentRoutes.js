const express = require('express');
const { getSessionId, verifyPayment } = require('../controllers/paymentController');

const router = express.Router();

// Route for generating session ID for payment
router.post('/sessionId', getSessionId);

// Route for verifying payment after completion
router.post('/verify', verifyPayment);

module.exports = router;
