const express = require('express');
const {getUserAddress} = require("../controllers/checkoutController");

const router = express.Router();

router.get('/address', getUserAddress);



module.exports = router;
