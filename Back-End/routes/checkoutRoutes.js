const express = require('express');
const {getUserAddress,saveAddress} = require("../controllers/checkoutController");

const router = express.Router();

router.get('/address', getUserAddress);

router.post('/saveAddress', saveAddress);


module.exports = router;
