const express = require('express');
const {
    addToWishlist,
    getWishlistItems,
    removeFromWishlist,
    getWishlistBooks
} = require('../controllers/wishlistController');

const router = express.Router();

router.post('/add', addToWishlist);
router.delete('/remove', removeFromWishlist);
router.get('/getWishlistItem', getWishlistItems);
router.get('/getWishlistBooks', getWishlistBooks); // Changed to GET for consistency

module.exports = router;
