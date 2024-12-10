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

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const db = await connectToDatabase();
        const collection = db.collection('deliveryPerson');

        const user = await collection.findOne({ email });

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
async function getDetails(req, res) {
    try {
        const { email } = req.body; // Retrieve email from the request body
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }
        console.log(email);
        const db = await connectToDatabase();
        const collection = db.collection('order_details');

        // Query to get order details where deliveryEmail matches the provided email
        const orderDetails = await collection.find(
            {
                'deliveryEmail': email,
                'status': { $ne: 'Delivered' } // This condition filters out orders where the status is not 'Completed'
            },
            {
                projection: {
                    orderId: 1,
                    'items': 1,
                    'mobileNumber': 1,
                    userId: 1,
                    'address': 1
                }
            }
        ).toArray(); // Convert the cursor to an array of documents

        if (orderDetails.length === 0) {
            return res.status(404).json({ message: 'No order details found.' });
        }

        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error retrieving order details:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
async function orderStatus(req, res) {
    try {
        const { orderId, status } = req.body;
        const db = await connectToDatabase();
        const collection = db.collection('order_details');

        // Update the order where the orderId matches
        const result = await collection.updateOne(
            { orderId: orderId }, // Filter condition
            { $set: { status: status } } // Update operation
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Order not found or status already set to the given value.' });
        }

        res.status(200).json({ message: 'Order status updated successfully.' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { register, login, getDetails,orderStatus };
