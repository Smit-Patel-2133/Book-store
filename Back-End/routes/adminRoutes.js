const express = require('express');
const { getBooks, updateBook,getOrderDetail } = require("../controllers/adminController");

const router = express.Router();

router.post('/books', getBooks);
router.put('/books/:id', updateBook); // Add this line for updating a book
router.get('/orderDetail', getOrderDetail);  // Corrected route

module.exports = router;
