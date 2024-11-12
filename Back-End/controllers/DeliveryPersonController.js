const { connectToDatabase } = require('../config/database');
const { MongoClient } = require('mongodb');

// Register route to handle the signup form
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber, adharCardNumber, driverLicenseNumber, state, city, pincode } = req.body;
        console.log("in register", firstName, lastName, email, mobileNumber, adharCardNumber, driverLicenseNumber, state, city, pincode);

        // Validate input data
        if (!firstName || !lastName || !email || !mobileNumber || !adharCardNumber || !driverLicenseNumber || !state || !city || !pincode) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the user is already registered by email
        const db = await connectToDatabase();
        const collection = db.collection('deliveryPerson');
        console.log("collllllllll");

        // Find if there's already a delivery person with the same email
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            console.log('Email is already registered.');
            return res.status(409).json({ message: 'Email is already registered.' });
        }

        // Create a new delivery person document without images
        const newDeliveryPerson = {
            firstName,
            lastName,
            email,
            mobileNumber,
            adharCardNumber,
            driverLicenseNumber,
            state,
            city,
            pincode,
            status: "Pending"
        };
        console.log(newDeliveryPerson);

        // Insert the new delivery person document into the collection
        const result = await collection.insertOne(newDeliveryPerson);
        console.log(result)
        // Respond with success
        res.status(201).json({ message: 'Registration successful!', deliveryPerson: result.ops[0] });
    } catch (error) {
        console.error('Error registering delivery person:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { register };
