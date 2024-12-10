const express = require('express');
const { getHomePageData, addContactDetailed, getContactDetails} = require('../controllers/HomeController');

const router = express.Router();

router.get('/bestSellers', getHomePageData);
router.post('/contact',addContactDetailed)

router.get('/contact-details', getContactDetails);

module.exports = router;
