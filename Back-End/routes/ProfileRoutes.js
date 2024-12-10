const express = require('express');
const { getuserInfo,getOrderPer} = require("../controllers/ProfileController");


const router = express.Router();

router.post('/userInfo', getuserInfo);

router.post('/orders', getOrderPer);
module.exports = router;
