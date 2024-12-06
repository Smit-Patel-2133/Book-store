const {connectToDatabase} = require('../config/database');
const {Cashfree} = require('cashfree-pg');
const {v4: uuidv4} = require('uuid'); // Import the uuid library
require('dotenv').config();
const { ObjectId } = require('mongodb');

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

const getSessionId = async (req, res) => {
    try {
        const {price, email, mobile, name} = req.body;
        let request = {
            "order_amount": parseFloat(price.toFixed(2)),
            "order_currency": 'INR',
            "order_id": await uuidv4(),
            "customer_details": {
                "customer_id": "customer_" + uuidv4(),
                "customer_name": name,
                "customer_email": email,
                "customer_phone": mobile,
            }
        };

        console.log(uuidv4())

        Cashfree.PGCreateOrder("2023-08-01", request)
            .then((result) => {
                res.json({success: true, order_id: request.order_id, session_id: result.data.payment_session_id});
            })
            .catch((error) => {
                console.error("Error creating order:", error.response ? error.response.data : error);
                res.status(500).json({
                    success: false,
                    message: "Payment processing failed.",
                    error: error.response ? error.response.data : error
                });
            });

    } catch (e) {
        console.error('Error in getSessionId:', e);
        res.status(500).json({success: false, message: "Payment processing failed."});
    }
};

const verifyPayment = async (req, res) => {
    try {
        let {orderId} = req.body;

        if (!orderId) {
            return res.status(400).json({success: false, message: "Order ID is missing"});
        }

        Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {

            res.json(response.data);
        }).catch(error => {
            console.error("Error verifying payment:", error.response ? error.response.data.message : error.message);
            res.status(500).json({success: false, message: "Payment verification failed."});
        });
    } catch (error) {
        console.log("Error in verifyPayment:", error);
        res.status(500).json({success: false, message: "Payment verification failed."});
    }
};
const saveOrder = async (req, res) => {
    const { paymentInfo } = req.body;
    console.log("payment info in back:-", paymentInfo);

    try {
        // Correct the property names to match the keys in paymentInfo
        const orderId = paymentInfo.orderId;
        const orderAmount = parseFloat(paymentInfo.orderAmount); // Ensure amount is stored as a number
        const date = new Date(paymentInfo.date); // Convert date to Date object if applicable
        const time = paymentInfo.time;
        const paymentMode = paymentInfo.paymentMode;
        const paymentStatus = paymentInfo.paymentStatus;
        const items = paymentInfo.items;
        const userId = paymentInfo.userId;
        const status="Pending"
        console.log("ooid:- ", orderId);

        const userCollection = (await connectToDatabase()).collection('userInfo');

        // Fetch address and mobileNumber from userInfo collection
        const userResult = await userCollection.findOne(
            { email: userId },
            { projection: { address: 1, mobileNumber: 1, _id: 0 } }
        );

        if (userResult && userResult.address) {
            console.log("Getting the address and mobile number:", userResult.address, userResult.mobileNumber);

            // Prepare order data
            const orderData = {
                orderId,
                orderAmount,
                date,
                time,
                paymentMode,
                paymentStatus,
                items,
                userId,
                address: userResult.address,
                mobileNumber: userResult.mobileNumber,
                status
            };
            console.log(orderData);

            // Insert the order data into the order_details collection
            const orderCollection = (await connectToDatabase()).collection('order_details');
            const insertResult = await orderCollection.insertOne(orderData);

            console.log("Order saved successfully:", insertResult.insertedId);
            res.status(200).json({ success: true, message: "Order saved successfully" });
        } else {
            console.log("Address not found for user:", userId);
            res.status(404).json({ success: false, message: "User address not found" });
        }

    } catch (e) {
        console.log("Error saving order:", e);
        res.status(500).json({ success: false, message: "Error saving order" });
    }
};

const orderUpdate = async (req, res) => {
    const { bookIds } = req.body;
    console.log("in back:-", bookIds);

    if (!bookIds || !Array.isArray(bookIds)) {
        return res.status(400).json({ success: false, message: "Invalid book IDs" });
    }

    try {
        const db = await connectToDatabase();
        const booksCollection = db.collection('books_info');

        // Convert bookIds to ObjectId
        const objectIds = bookIds.map(id => {
            try {
                return new ObjectId(id);
            } catch (err) {
                console.error(`Invalid ObjectId: ${id}`, err);
                throw new Error(`Invalid ObjectId: ${id}`);
            }
        });

        // Update the number_of_orders field for each book ID
        const updatePromises = objectIds.map(async (bookId) => {
            return booksCollection.updateOne(
                { _id: bookId }, // Filter by _id
                { $inc: { number_of_orders: 1 } } // Increment number_of_orders by 1
            );
        });

        // Await all update operations
        await Promise.all(updatePromises);

        console.log("Books updated successfully:", objectIds);
        res.status(200).json({ success: true, message: "Books updated successfully" });
    } catch (error) {
        console.error("Error updating books:", error);
        res.status(500).json({ success: false, message: "Error updating books" });
    }
};


module.exports = {
    getSessionId,
    verifyPayment,
    saveOrder,
    orderUpdate
};
