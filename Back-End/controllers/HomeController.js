const {connectToDatabase} = require('../config/database');

async function getHomePageData(req, res) {
    console.log("Fetching home page data..."); // More informative log

    try {
        const collection = (await connectToDatabase()).collection('books_info');

        // Fetch the 10 newest books by publication year (new arrivals)
        const newArrivals = await collection
            .find({
                _id: {$exists: true},
                title: {$exists: true},
                author: {$exists: true},
                description: {$exists: true},
                language: {$exists: true},
                genres: {$exists: true},
                characters: {$exists: true},
                bookFormat: {$exists: true},
                pages: {$exists: true},
                publisher: {$exists: true},
                publishDate: {$exists: true},
                awards: {$exists: true},
                setting: {$exists: true},
                coverImg: {$exists: true},
                price: {$exists: true},
                main_genre: {$exists: true},
                rating: {$exists: true},
                rating_count: {$exists: true},
                likes: {$exists: true},

            })
            .sort({publishDate: -1}) // Change to sort by publishDate
            .limit(10)
            .toArray();

        // Fetch the 10 best-rated books (best sellers)
        const bestSellers = await collection
            .find({
                average_rating: {$exists: true},
                title: {$exists: true},
                authors: {$exists: true},
                categories: {$exists: true},
                thumbnail: {$exists: true}
            })
            .sort({average_rating: -1})
            .limit(10)
            .toArray();

        // Send the response as JSON
        res.status(200).json({
            newArrivals,
            bestSellers
        });
    } catch (error) {
        console.error("Database or query issue:", error);
        res.status(500).json({error: "Unable to fetch homepage data due to database issues."});
    }
}

module.exports = {getHomePageData};
