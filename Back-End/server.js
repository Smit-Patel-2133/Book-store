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
    const adminRoutes=require('./routes/adminRoutes');
    const checkoutRoutes = require('./routes/checkoutRoutes');
    const paymentRoutes = require('./routes/paymentRoutes');
    const DeliveryRotes=require('./routes/DeliveryPersonRouters');
    const ProfileRoutes = require('./routes/ProfileRoutes');
    const app = express();
    const port = process.env.PORT || 3000;

    const { connectToDatabase } = require('./config/database');
    // Middleware
    app.use(bodyParser.json());
    app.use(cors());


    connectToDatabase();


    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/books', bookRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/wishlist', wishlistRoutes);
    app.use('/api/homepage', homeRoutes);
    app.use('/api/admin', adminRoutes)
    app.use('/api/checkout',checkoutRoutes)
    app.use('/api/payment',paymentRoutes)
    app.use('/api/DeliveryPerson',DeliveryRotes)
    app.use('/api/profile',ProfileRoutes)
    // Root endpoint for testing
    app.get('/', (req, res) => {
        res.send('Welcome to the login/signup API');
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
