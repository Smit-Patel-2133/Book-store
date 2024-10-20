// controllers/wishlistController.js
const { connectToDatabase } = require('../config/database');

async function addToWishlist(userId, bookId) {
    const collection = await connectToDatabase().collection('wishlist');
    return collection.updateOne(
        { userId },
        { $addToSet: { items: bookId } },
        { upsert: true }
    );
}

async function getWishlistItems(userId) {
    const collection = await connectToDatabase().collection('wishlist');
    const wishlist = await collection.findOne({ userId });
    return wishlist ? wishlist.items : [];
}

async function removeFromWishlist(userId, bookId) {
    const collection = await connectToDatabase().collection('wishlist');
    return collection.updateOne(
        { userId },
        { $pull: { items: bookId } }
    );
}

module.exports = { addToWishlist, getWishlistItems, removeFromWishlist };
