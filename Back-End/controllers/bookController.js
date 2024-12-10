// controllers/bookController.js
const { connectToDatabase } = require('../config/database');
const axios = require('axios');
const req = require("express/lib/request");
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

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


async function reviews(req, res) {
    try {
        const db = await connectToDatabase();
        const reviewsCollection = db.collection('reviews');
        const booksCollection = db.collection('books_info');

        const { bookId, userId, review, rating } = req.body;

        // Step 1: Insert the new review into the 'reviews' collection
        const newReview = {
            bookId,
            userId,
            review,
            rating,
            date: new Date(),
        };

        const reviewResult = await reviewsCollection.insertOne(newReview);

        if (reviewResult.insertedId) {
            // Step 2: Calculate the new average rating for the book
            const allReviews = await reviewsCollection.find({ bookId }).toArray();
            const totalRatings = allReviews.reduce((sum, r) => sum + r.rating, 0);
            // Calculate the average rating and convert it to an integer
            const averageRating = Math.round(totalRatings / allReviews.length);
            await booksCollection.updateOne(
                { _id: new mongoose.Types.ObjectId(bookId) },
                {
                    $set: { rating: averageRating },
                    $inc: { rating_count: 1 } // Increment the rating_count by 1
                }
            );


            res.status(201).json({ message: 'Review added successfully!', review: newReview, averageRating });
        } else {
            res.status(500).json({ message: 'Failed to add the review' });
        }
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'An error occurred while adding the review' });
    }
}

async function getReviews(req, res) {
    const { bookId } = req.params; // Make sure this matches the route parameter
    try {
        const db = await connectToDatabase();
        const reviewsCollection = db.collection('reviews');

        // Find reviews for the specified bookId
        const reviews = await reviewsCollection.find({ bookId }).toArray();

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Error fetching reviews" });
    }
}

module.exports = { getBooks, getHomePageData, reviews, getReviews };