const express = require('express');
const {register,login} = require("../controllers/DeliveryPersonController");
const router = express.Router();

router.post('/register', register);
router.post('/Deliverylogin', login);

module.exports = router;
