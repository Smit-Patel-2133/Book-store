const { connectToDatabase } = require('../config/database');

async function addToCart(req, res) {
    const { userId, bookId } = req.body;
    console.log("addToCart", userId, bookId);
    try {
        const db = await connectToDatabase();
        const collection = db.collection('cart');

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
    console.log("removeFromCart", userId, bookId);

    try {
        const db = await connectToDatabase();
        const collection = db.collection('cart');

        await collection.deleteOne({ userId, bookId });
        res.status(200).send({ message: "Book removed from cart successfully!" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).send({ error: "An error occurred while removing from the cart." });
    }
}

async function getCartItems(req, res) {
    const { userId } = req.query;
    try {
        const db = await connectToDatabase();
        const collection = db.collection('cart');
        const cartItems = await collection.find({ userId }).toArray();
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send({ error: "An error occurred while fetching the cart items." });
    }
}

// New function to fetch detailed information of books by book IDs
const { ObjectId } = require('mongodb');

async function getCartItemDetails(req, res) {
    const { bookIds } = req.body;
    console.log("cart:", bookIds);

    try {
        const db = await connectToDatabase();
        const collection = db.collection('books_info');

        // Convert bookIds to ObjectId instances with 'new'
        const convertedBookIds = bookIds.map(id => new ObjectId(id));

        // Fetch detailed info of all books matching the IDs
        const books = await collection.find({ _id: { $in: convertedBookIds } }).toArray();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching cart item details:", error);
        res.status(500).send({ error: "An error occurred while fetching the cart item details." });
    }
}

module.exports = { addToCart, removeFromCart, getCartItems, getCartItemDetails };
