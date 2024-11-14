const express = require('express');
const { getBooks, updateBook,getOrderDetail, addBook, getOverview} = require("../controllers/adminController");

const router = express.Router();

router.post('/books', getBooks);
router.put('/books/:id', updateBook); // Add this line for updating a book
router.get('/orderDetail', getOrderDetail);  // Corrected route
router.post('/addBook', addBook);
router.post('/overview',getOverview)
module.exports = router;
