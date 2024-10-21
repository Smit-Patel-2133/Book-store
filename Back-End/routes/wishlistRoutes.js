const express = require('express');
const {addToWishlist, getWishlistItems, removeFromWishlist  } = require('../controllers/wishlistController');

const router = express.Router();

router.post('/add', addToWishlist);
router.delete('/remove', removeFromWishlist);
router.get('/getWishlistItem', getWishlistItems);

// Add other wishlist-related routes...

module.exports = router;
