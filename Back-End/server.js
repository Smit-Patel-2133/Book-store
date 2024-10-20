const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const homeRoutes = require('./routes/homeRoutes');
const app = express();
const port = process.env.PORT || 3000;

const { connectToDatabase } = require('./config/database');
// Middleware
app.use(bodyParser.json());
app.use(cors());


connectToDatabase();

// Session middleware
app.use(session({
    secret: 'your_secret_key', // Change this to a secure key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/your_db_name' }),
    cookie: { maxAge: 180 * 60 * 1000 } // Session duration (3 hours)
}));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/homepage', homeRoutes);

// Root endpoint for testing
app.get('/', (req, res) => {
    res.send('Welcome to the login/signup API');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
