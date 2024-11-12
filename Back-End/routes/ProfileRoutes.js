const express = require('express');
const { getuserInfo} = require("../controllers/ProfileController");

const router = express.Router();

router.post('/getuserInfo', getuserInfo);;  // Corrected route

module.exports = router;
