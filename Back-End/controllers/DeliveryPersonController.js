const { connectToDatabase } = require('../config/database');
const { MongoClient } = require('mongodb');

// Register route to handle the signup form
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const {
            firstName, lastName, email, mobileNumber,
            adharCardNumber, driverLicenseNumber,
            state, city, pincode, password, confirmPassword
        } = req.body;

        // Validate input
        if (!firstName || !lastName || !email || !mobileNumber || !adharCardNumber ||
            !driverLicenseNumber || !state || !city || !pincode || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Convert Aadhaar and pincode to integers
        const adharCardNumberInt = parseInt(adharCardNumber, 10);
        const pincodeInt = parseInt(pincode, 10);

        const db = await connectToDatabase();
        const collection = db.collection('deliveryPerson');

        // Ensure email and mobile number are unique
        const existingUser = await collection.findOne({ $or: [{ email }, { mobileNumber }] });
        if (existingUser) {
            const message = existingUser.email === email
                ? 'Email is already registered.'
                : 'Mobile number is already registered.';
            return res.status(409).json({ message });
        }

        // Insert new delivery person
        const newDeliveryPerson = {
            firstName,
            lastName,
            email,
            mobileNumber,
            adharCardNumber: adharCardNumberInt,
            driverLicenseNumber,
            state,
            city,
            pincode: pincodeInt,
            password: hashedPassword, // Save hashed password
            status: "Pending"
        };

        const result = await collection.insertOne(newDeliveryPerson);

        res.status(201).json({
            message: 'Registration successful!',
            deliveryPerson: { id: result.insertedId, ...newDeliveryPerson }
        });
    } catch (error) {
        console.error('Error registering delivery person:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, "  ", password);
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const db = await connectToDatabase();
        const collection = db.collection('deliveryPerson');

        const user = await collection.findOne({ email });
        console.log("user ", user);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Exclude password from the user object
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({ success: true, message: 'Login successful!', user: userWithoutPassword });
    } catch (error) {
        console.error('Error logging in delivery person:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = { register,login };