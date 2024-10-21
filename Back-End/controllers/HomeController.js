const { connectToDatabase } = require('../config/database');

async function getHomePageData(req, res) {
    console.log("Fetching home page data..."); // More informative log

    try {
        const collection = (await connectToDatabase()).collection('books_info');

        // Fetch the 10 newest books by publication year (new arrivals)
        const newArrivals = await collection
            .find({

            })
            .sort({ publishDate: -1 }) // Change to sort by publishDate
            .limit(10)
            .toArray();

        // Fetch all best-selling books based on the number_of_orders field
        const bestSellers = await collection
            .find({

            })
            .sort({ number_of_orders: -1 })
            .limit(10)
            .toArray();

        // Send the response as JSON
        res.status(200).json({
            newArrivals,
            bestSellers
        });
    } catch (error) {
        console.error("Database or query issue:", error);
        res.status(500).json({ error: "Unable to fetch homepage data due to database issues." });
    }
}

module.exports = { getHomePageData };
