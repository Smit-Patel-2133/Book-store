const express = require('express');
const { getuserInfo} = require("../controllers/ProfileController");

const router = express.Router();

router.post('/userInfo', getuserInfo);

module.exports = router;
