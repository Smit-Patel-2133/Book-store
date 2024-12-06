const express = require('express');
const { getBooks, getRecommendations, reviews} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);
router.post('/reviews',reviews);

module.exports = router;
