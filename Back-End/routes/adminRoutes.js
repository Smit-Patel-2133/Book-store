const express = require('express');
const { getBooks, updateBook } = require("../controllers/adminController");

const router = express.Router();

router.post('/books', getBooks);
router.put('/books/:id', updateBook); // Add this line for updating a book

module.exports = router;
