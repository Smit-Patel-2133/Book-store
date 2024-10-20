const bcrypt = require('bcrypt');
const { connectToDatabase } = require('../config/database');

// Sign-up function
async function signup(req, res) {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDocument = {
        username,
        email,
        password: hashedPassword,
        profile_pic: 1,
        registeredAt: new Date(),
    };

    const collection = (await connectToDatabase()).collection('userInfo');
    try {
        const result = await collection.insertOne(userDocument);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        console.error('Failed to register user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}

// Login function
async function login(req, res) {
    const { email, password } = req.body;
    const collection = (await connectToDatabase()).collection('userInfo');

    try {
        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Send user data back to the frontend without storing in session
        res.status(200).json({
            message: 'Login successful',
            username: user.username,
            userEmail: user.email,
            profile_pic: user.profile_pic
        });
    } catch (error) {
        console.error('Failed to login user:', error);
        res.status(500).json({ error: 'Failed to login user' });
    }
}

// Logout function
async function logout(req, res) {
    // Handle logout on the client side
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = { signup, login, logout };
