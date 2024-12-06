const express = require('express');
const { getSessionId, verifyPayment, saveOrder, orderUpdate} = require('../controllers/paymentController');

const router = express.Router();

router.post('/sessionId', getSessionId);
router.post('/verify', verifyPayment);
router.post('/order_details', saveOrder);
router.put('/orderUpdate',orderUpdate);
module.exports = router;
