const express = require('express');
const { addToWishlist } = require('../controllers/wishlistController');

const router = express.Router();

router.post('/', addToWishlist);

// Add other wishlist-related routes...

module.exports = router;
