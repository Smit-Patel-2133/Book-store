const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb'); // Ensure ObjectId is imported

async function addToWishlist(req, res) {
    const { userId, bookId } = req.body; // Extract userId and bookId from request body

    try {
        const db = await connectToDatabase();
        const collection = db.collection('wishlist');

        // Check if the user already has a wishlist
        const existingWishlist = await collection.findOne({ userId });

        // If the user does not have a wishlist, create a new one
        if (!existingWishlist) {
            await collection.insertOne({ userId, items: [bookId] });
            console.log("addToWishlist: New wishlist created for user", userId);
            return res.status(201).send({ message: "Book added to wishlist!" });
        }

        // Check if the book is already in the wishlist for the user
        if (existingWishlist.items.includes(bookId)) {
            return res.status(400).send({ message: "Book already in wishlist!" });
        }

        // Add to wishlist
        await collection.updateOne(
            { userId },
            { $addToSet: { items: bookId } } // $addToSet ensures uniqueness
        );

        console.log("addToWishlist", userId, bookId);
        res.status(201).send({ message: "Book added to wishlist!" });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).send({ error: "An error occurred while adding to the wishlist." });
    }
}

async function removeFromWishlist(req, res) {
    const { userId, bookId } = req.body; // Extract userId and bookId from request body
    console.log("removeFromWishlist", userId, bookId);

    try {
        const db = await connectToDatabase();
        const collection = db.collection('wishlist');

        // Remove from wishlist
        const result = await collection.updateOne(
            { userId },
            { $pull: { items: bookId } } // Remove bookId from the items array
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send({ message: "Book not found in wishlist!" });
        }

        res.status(200).send({ message: "Book removed from wishlist successfully!" });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        res.status(500).send({ error: "An error occurred while removing from the wishlist." });
    }
}

async function getWishlistItems(req, res) {
    const { userId } = req.query; // Retrieve userId from query parameters
    try {
        const db = await connectToDatabase();
        const collection = db.collection('wishlist');
        const wishlist = await collection.findOne({ userId });

        // Return wishlist items as JSON response
        const items = wishlist ? wishlist.items : [];
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching wishlist items:", error);
        res.status(500).send({ error: "An error occurred while fetching the wishlist items." });
    }
}

async function getWishlistBooks(req, res) {
    const { userId } = req.query; // Retrieve userId from query parameters
    try {
        const db = await connectToDatabase();
        const wishlistCollection = db.collection('wishlist');
        const bookCollection = db.collection('books_info');

        // Retrieve the wishlist for the user
        const wishlist = await wishlistCollection.findOne({ userId });
        console.log("Wishlist:", wishlist);

        if (!wishlist) {
            return res.status(404).send({ message: "Wishlist not found for this user." });
        }

        // Get the array of book IDs from the wishlist
        const bookIds = wishlist.items;
        console.log("ids:-", bookIds);

        // Ensure bookIds are converted to ObjectId
        const objectIds = bookIds.map(id => {
            try {
                return new ObjectId(id); // Convert each ID to ObjectId
            } catch (error) {
                console.error("Error converting string to ObjectId:", error);
                return null; // Return null if conversion fails
            }
        }).filter(id => id !== null); // Filter out any null values
        console.log("ids:-", objectIds);

        // Fetch the books from the book_info collection that match the IDs in the wishlist
        const books = await bookCollection.find({ _id: { $in: objectIds } }).toArray();
        console.log("Books found:", books);

        // Return the books as JSON response
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching wishlist books:", error);
        res.status(500).send({ error: "An error occurred while fetching the wishlist books." });
    }
}

module.exports = { addToWishlist, getWishlistItems, removeFromWishlist, getWishlistBooks };
