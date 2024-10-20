const express = require('express');
const { getBooks, getRecommendations} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);

module.exports = router;
