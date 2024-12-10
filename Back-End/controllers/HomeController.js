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
        console.log("bestSellers",bestSellers)
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
async function addContactDetailed(req, res) {
    try {
        // Connect to the MongoDB database
        const db = await connectToDatabase();
        const collection = db.collection('contact');

        // Extract data from the request body
        const { email, phone, message } = req.body;

        // Validate the required fields
        if (!email || !phone || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Prepare the data for insertion
        const contactDetails = {
            email,
            phone,
            message,
            createdAt: new Date(), // Optional: Add timestamp
        };

        // Insert the contact details into the collection
        const result = await collection.insertOne(contactDetails);

        // Respond with success
        if (result.acknowledged) {
            res.status(200).json({ message: 'Contact details added successfully!' });
        } else {
            res.status(500).json({ message: 'Failed to add contact details' });
        }
    } catch (err) {
        console.error('Error adding contact details:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function getContactDetails(req, res) {
    try {
        console.log("Getting details");

        // Connect to the MongoDB database
        const db = await connectToDatabase();
        const collection = db.collection('contact');

        // Fetch all contact messages, sorted by 'createdAt' in ascending order (oldest first)
        const contactDetails = await collection.find().sort({ createdAt: 1 }).toArray();

        console.log(contactDetails);

        // Respond with the contact details
        res.status(200).json(contactDetails);
    } catch (err) {
        console.error('Error fetching contact details:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { getHomePageData, addContactDetailed, getContactDetails };

