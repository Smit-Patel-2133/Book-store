    const { connectToDatabase } = require('../config/database');
    const { Cashfree } = require('cashfree-pg');
    const { v4: uuidv4 } = require('uuid'); // Import the uuid library
    require('dotenv').config();

    Cashfree.XClientId = process.env.CLIENT_ID;
    Cashfree.XClientSecret = process.env.CLIENT_SECRET;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

        const getSessionId = async (req, res) => {
            try {
                const { price, email, mobile, name } = req.body;
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
                console.log("Client ID:", process.env.CLIENT_ID); // Verify Client ID
                console.log("Client Secret:", process.env.CLIENT_SECRET); // Verify Client Secret

                console.log(uuidv4())
                console.log("Request for Cashfree:", request);  // Log the request object

                Cashfree.PGCreateOrder("2023-08-01", request)
                    .then((result) => {
                        console.log("Cashfree response:", result.data);
                        res.json({ success: true, order_id: request.order_id, session_id: result.data.payment_session_id });
                    })
                    .catch((error) => {
                        console.error("Error creating order:", error.response ? error.response.data : error);
                        res.status(500).json({ success: false, message: "Payment processing failed.", error: error.response ? error.response.data : error });
                    });

            } catch (e) {
                console.error('Error in getSessionId:', e);
                res.status(500).json({ success: false, message: "Payment processing failed." });
            }
        };

    const verifyPayment = async (req, res) => {
        try {
            let { orderId } = req.body;
            console.log("Received orderId from frontend:", orderId);

            if (!orderId) {
                return res.status(400).json({ success: false, message: "Order ID is missing" });
            }

            Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {
                console.log("Backend response for order verification:", response.data);
                console.log("Payment Status:", response.data.payment_status);
                console.error("Payment status not found in the response:", response.data);

                res.json(response.data);
            }).catch(error => {
                console.error("Error verifying payment:", error.response ? error.response.data.message : error.message);
                res.status(500).json({ success: false, message: "Payment verification failed." });
            });
        } catch (error) {
            console.log("Error in verifyPayment:", error);
            res.status(500).json({ success: false, message: "Payment verification failed." });
        }
    };


    module.exports = {
        getSessionId,
        verifyPayment
    };
