// server/controllers/cartController.js
const { connectToDatabase } = require('../config/database');

async function addToCart(req, res) {
    const { userId, bookId } = req.body;
    console.log("addToCart", userId, bookId);
    try {
        const db = await connectToDatabase();
        const collection = db.collection('cart');

        // Check if the book is already in the cart for the user
        const existingItem = await collection.findOne({ userId, bookId });
        if (existingItem) {
            return res.status(400).send({ message: "Book already in cart!" });
        }
        await collection.insertOne({ userId, bookId });
        res.status(201).send({ message: "Book added to cart!" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send({ error: "An error occurred while adding to the cart." });
    }
}

async function removeFromCart(req, res) {
    const { userId, bookId } = req.body;
    console.log("removeToCart", userId, bookId);

    try {
        const db = await connectToDatabase();
        const collection = db.collection('cart');

        await collection.deleteOne({ userId, bookId }); // Remove the specific item
        res.status(200).send({ message: "Book removed from cart successfully!" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).send({ error: "An error occurred while removing from the cart." });
    }
}
async function getCartItems(req, res) {
    const { userId } = req.query;  // Retrieve the userId from query parameters
    try {
        const db = await connectToDatabase();
        const collection = db.collection('cart');
        const cartItems = await collection.find({ userId }).toArray(); // Find items by userId
        res.status(200).json(cartItems); // Return cart items as JSON response
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send({ error: "An error occurred while fetching the cart items." });
    }
}


module.exports = { addToCart, removeFromCart ,getCartItems};
