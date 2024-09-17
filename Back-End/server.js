const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Configuration
const port = process.env.PORT || 3000; // Use environment variable or default port
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://smit02042004:TObFfwtBpduoy170@authentication.nrgs5.mongodb.net/?retryWrites=true&w=majority&appName=Authentication'; // Use environment variable for Mongo URI

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Client
const client = new MongoClient(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Function to connect to the database
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB!");
        return client.db('userDatabase').collection('userInfo');
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}

// Function to handle user signup
async function signup(userDocument) {
    const collection = await connectToDatabase();
    try {
        const result = await collection.insertOne(userDocument);
        console.log(`User inserted with _id: ${result.insertedId}`);
        return result;
    } catch (err) {
        console.error("Failed to insert user:", err);
        throw err;
    } finally {
        // Ensures that the client will close when finished
        await client.close();
    }
}

// Root endpoint for testing
app.get('/', (req, res) => {
    res.send('Welcome to the login/signup API');
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const userDocument = {
        username,
        email,
        password: hashedPassword,
        registeredAt: new Date(),
    };

    try {
        const result = await signup(userDocument);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        console.error('Failed to register user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});


// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', email);

    try {
        const collection = await connectToDatabase();
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        // Compare password with hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Failed to login user:', error);
        res.status(500).json({ error: 'Failed to login user' });
    }
});

let db=null
async function connectToDatabase2() {
    if (db) {
        return db.collection('books_info');
    }
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB!");
        db = client.db('userDatabase');
        return db.collection('books_info');
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}
app.get('/books', async (req, res) => {
    try {
        const collection = await connectToDatabase2();
        // Sort by published_year in descending order (-1 for descending)
        const books = await collection.find({}).sort({ ratings_count: -1 }).limit(2000).toArray();

        res.status(200).json(books);
    } catch (error) {
        console.error('Failed to fetch books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
