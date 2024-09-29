const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { spawn } = require("child_process");
const natural = require('natural');
const TfIdf = natural.TfIdf;

// Configuration
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://smit02042004:TObFfwtBpduoy170@authentication.nrgs5.mongodb.net/?retryWrites=true&w=majority&appName=Authentication';

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
        return result;
    } catch (err) {
        console.error("Failed to insert user:", err);
        throw err;
    } finally {
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDocument = {
        username,
        email,
        password: hashedPassword,
        profile_pic: 1,
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
    try {
        const collection = await connectToDatabase();
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

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
});

let db = null;
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
        const { category, search } = req.query;
        const collection = await connectToDatabase2();
        let query = {};

        if (category) {
            query.categories = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { authors: { $regex: search, $options: 'i' } }
            ];
        }

        const books = await collection.find(query).sort({ ratings_count: -1 }).limit(2000).toArray();
        res.status(200).json(books);
    } catch (error) {
        console.error('Failed to fetch books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

app.get('/homepage', async (req, res) => {
    try {
        const homepageData = await getHomePageData();
        res.json(homepageData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching homepage data', error });
    }
});

async function getHomePageData() {
    try {
        const collection = await connectToDatabase2(); // Fetch the correct collection

        // Fetch the 10 newest books by publication year (new arrivals)
        const newArrivals = await collection
            .find({
                average_rating: { $exists: true },
                title: { $exists: true },
                authors: { $exists: true },
                categories: { $exists: true }
            })
            .sort({ published_year: -1 })
            .limit(10)
            .toArray();

        // Fetch the 10 best-rated books (best sellers)
        const bestSellers = await collection
            .find({
                average_rating: { $exists: true },
                title: { $exists: true },
                authors: { $exists: true },
                categories: { $exists: true },
                thumbnail:{$exists:true}
            })
            .sort({ average_rating: -1 })
            .limit(10)
            .toArray();

        return {
            newArrivals,
            bestSellers
        };
    } catch (error) {
        console.error("Database or query issue:", error);
        throw new Error("Unable to fetch homepage data due to database issues.");
    }
}

app.get('/rec', async (req, res) => {
    const { name } = req.query;
    console.log("name:-", name);

    try {
        const collection = await connectToDatabase2();
        const bookData = await collection.find({ title: new RegExp(name, 'i') }).toArray();

        if (bookData.length === 0) {
            return res.status(404).send('Book not found');
        }

        const inputBook = bookData[0];
        const inputBookTitle = inputBook.title || '';
        const inputBookAuthors = Array.isArray(inputBook.authors) ? inputBook.authors.join(', ') : (inputBook.authors || '');
        const inputBookDescription = inputBook.description || '';

        // Fetch all books from the database
        const allBooks = await collection.find({}).toArray();

        // Prepare combined features for TF-IDF
        const combinedFeatures = allBooks.map(book => {
            const title = book.title || '';
            const authors = Array.isArray(book.authors) ? book.authors.join(', ') : (book.authors || '');
            const categories = book.categories || '';
            const description = book.description || '';
            return `${title} ${authors} ${categories} ${description}`;
        });

        // Add the input book to the combined features
        combinedFeatures.push(`${inputBookTitle} ${inputBookAuthors} ${inputBookDescription}`);

        // Use TF-IDF Vectorizer to convert titles into numerical vectors
        const tfidf = new TfIdf();
        combinedFeatures.forEach(features => tfidf.addDocument(features));

        // Get the vector for the input book title
        const inputIndex = tfidf.documents.length - 1;
        const inputVector = tfidf.listTerms(inputIndex).map(term => term.tfidf);

        // Calculate cosine similarities
        const similarities = [];
        for (let i = 0; i < tfidf.documents.length - 1; i++) {
            const bookVector = tfidf.listTerms(i).map(term => term.tfidf);
            const cosineSimilarity = calculateCosineSimilarity(inputVector, bookVector);
            similarities.push({ book: allBooks[i], similarity: cosineSimilarity });
        }

        // Sort by similarity and get the top 200
        similarities.sort((a, b) => b.similarity - a.similarity);
        const recommendedBooks = similarities.slice(0, 200).map(item => item.book);

        res.status(200).json(recommendedBooks);
    } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});

// Function to calculate cosine similarity
function calculateCosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, value, index) => sum + value * (vecB[index] || 0), 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, value) => sum + value * value, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, value) => sum + value * value, 0));

    if (magnitudeA === 0 || magnitudeB === 0) return 0; // Prevent division by zero
    return dotProduct / (magnitudeA * magnitudeB);
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
