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

async function getOrderDetail(req, res) {
    try {
        console.log("Fetching order details...");

        // Connect to the database
        const db = await connectToDatabase();
        const collection = db.collection('order_details');

        // Fetch all orders and convert the cursor to an array
        const pendingOrders = await collection.find().toArray();

        // If no orders are found, return a message
        if (pendingOrders.length === 0) {
            return res.status(404).json({ message: "No pending orders found." });
        }

        // Send the found orders as a response
        return res.status(200).json(pendingOrders);

    } catch (e) {
        console.error("Error fetching order details:", e);
        return res.status(500).json({ message: "Internal server error." });
    }
}
async function addBook(req,res){
    try{
        console.log("adding")
        const db = await connectToDatabase();
        const collection = db.collection('books_info');
        const add=await collection.insertOne(req.body);
        console.log(add)
        return res.status(200).json({ message: "book added" });

    }catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'Failed to add book' });

    }
}
async function getOverview(req, res) {
    try {
        const db = await connectToDatabase();

        // Total Users Count
        const userCollection = db.collection('userInfo');
        const totalUsers = await userCollection.countDocuments();

        // New Users in the Last Week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newUsers = await userCollection.countDocuments({
            registeredAt: { $gte: oneWeekAgo }
        });

        // Total Books Count
        const bookCollection = db.collection('books_info');
        const totalBooks = await bookCollection.countDocuments();

        // Total Sales
        const orderCollection = db.collection('order_details');
        const totalSalesData = await orderCollection.aggregate([
            { $group: { _id: null, totalSales: { $sum: "$orderAmount" } } }
        ]).toArray();
        const totalSales = totalSalesData.length > 0 ? totalSalesData[0].totalSales : 0;
        console.log(totalSales," ",totalUsers," ",newUsers,"  ",totalBooks)
        // Return the statistics
        res.status(200).json({
            totalSales,
            totalUsers,
            newUsers,
            totalBooks,
            newBooks: 0 // No need to calculate newBooks as per your request
        });
    } catch (e) {
        console.error("Error in getOverview:", e);
        res.status(500).json({ error: "Failed to fetch overview data" });
    }
}

module.exports = { getBooks, updateBook, getOrderDetail, addBook, getOverview };