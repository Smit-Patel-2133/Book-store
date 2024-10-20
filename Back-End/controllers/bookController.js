// controllers/bookController.js
const { connectToDatabase } = require('../config/database');
const axios = require('axios');

// Fetch books
async function getBooks(req, res) {
    console.log("Fetching books...");
    const db = await connectToDatabase(); // Await the database connection
    const collection = db.collection('books_info'); // Access the collection here

    const { category, search } = req.query;
    let mongoQuery = {};

    if (category) mongoQuery.categories = category;
    if (search) {
        mongoQuery.$or = [
            { title: { $regex: search, $options: 'i' } },
            { authors: { $regex: search, $options: 'i' } }
        ];
    }


    try {
        const books = await collection.find(mongoQuery).sort({ ratings_count: -1 }).limit(2000).toArray();
        res.status(200).json(books); // Send the response back
    } catch (error) {
        console.error('Failed to fetch books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
}


// Fetch homepage data
async function getHomePageData() {
    const db = await connectToDatabase(); // Await the database connection
    const collection = db.collection('books_info');
    const newArrivals = await collection.find({ average_rating: { $exists: true } })
        .sort({ published_year: -1 }).limit(10).toArray();
    const bestSellers = await collection.find({ average_rating: { $exists: true } })
        .sort({ average_rating: -1 }).limit(10).toArray();
    return { newArrivals, bestSellers };
}



module.exports = { getBooks, getHomePageData };
