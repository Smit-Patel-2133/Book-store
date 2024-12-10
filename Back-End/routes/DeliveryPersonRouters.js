const express = require('express');
const {register,login, getDetails, orderStatus} = require("../controllers/DeliveryPersonController");
const router = express.Router();

router.post('/register', register);
router.post('/Deliverylogin', login);
router.post('/getDetails', getDetails);
router.post('/orderStatus',orderStatus);
module.exports = router;
