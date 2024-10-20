const express = require('express');
const { getHomePageData } = require('../controllers/HomeController');

const router = express.Router();

router.get('/bestSellers', getHomePageData);



module.exports = router;
