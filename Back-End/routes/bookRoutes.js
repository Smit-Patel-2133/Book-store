const express = require('express');
const { getBooks, getRecommendations, reviews, getReviews } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);
router.post('/reviews', reviews);
router.get('/reviews/:bookId', getReviews); // Add this route for fetching reviews by bookId

module.exports = router;
