const { connectToDatabase } = require('../config/database');
const mongoose = require('mongoose'); // Add this line

async function getBooks(req, res) {
    console.log("Fetching books fro admin");
    const db = await connectToDatabase(); // Await the database connection
    const collection = db.collection('books_info'); // Access the collection here

    try {
        const books = await collection.find().toArray();
        res.status(200).json(books); // Send the response back
    } catch (error) {
        console.error('Failed to fetch books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
}

async function updateBook(req, res) {
    console.log("Entering updateBook function");
    const { id } = req.params; // Get the book ID from the URL parameters
    const updatedData = req.body; // Get the updated book data from the request body

    // Filter out the _id field from the updatedData object
    const { _id, ...dataToUpdate } = updatedData;

    const db = await connectToDatabase(); // Await the database connection
    const collection = db.collection('books_info'); // Access the collection here

    try {
        console.log("Updating book with ID:", id);
        console.log("Updated data:", dataToUpdate);

        // Update the book in the database
        const result = await collection.updateOne(
            { _id: new mongoose.Types.ObjectId(id) }, // Filter by ID
            { $set: dataToUpdate } // Update the document with new data
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Book not found or no changes made' });
        }

        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error('Failed to update book:', error);
        res.status(500).json({ error: 'Failed to update book' });
    }
}



module.exports = { getBooks, updateBook };
