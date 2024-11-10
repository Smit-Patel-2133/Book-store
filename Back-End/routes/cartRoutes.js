const express = require('express');
const { addToCart, getCartItems, removeFromCart, getCartItemDetails } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', addToCart);
router.delete('/remove', removeFromCart);
router.get('/getCartItem', getCartItems);
router.post('/getCartItemDetails', getCartItemDetails); // New route for fetching book details

module.exports = router;
