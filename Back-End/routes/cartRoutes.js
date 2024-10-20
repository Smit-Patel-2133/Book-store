// routes/cartRoutes.js
const express = require('express');
const { addToCart, getCartItems,removeFromCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', addToCart);
router.delete('/remove', removeFromCart); // Fetch cart items by userId
router.get('/getCartItem', getCartItems);
module.exports = router;
