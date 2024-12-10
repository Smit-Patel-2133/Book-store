const { connectToDatabase } = require('../config/database');


const getuserInfo = async (req, res) => {
    const { email } = req.body;
    console.log("Email from profile request:", email);
    try {
        const db = await connectToDatabase(); // Connect to the database
        const userInfoCollection = db.collection('userInfo'); // Access the `userinfo` collection

        // Fetch user information by email
        const user = await userInfoCollection.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the user data back, ensuring the profile_pic field is correctly mapped
        const userResponse = {
            username: user.username,
            email: user.email,
            mobileNumber: user.mobileNumber,
            address: user.address,
            profile_pic: user.profile_pic, // Send profile picture ID (or URL if already formatted)
        };

        console.log(userResponse);
        res.json(userResponse); // Send the user data back to the client
    } catch (e) {
        console.error("Error fetching user info:", e);
        res.status(500).json({ message: "Server error" });
    }
};
async function getOrderPer(req, res) {
    const { email } = req.body;
    try {
        console.log("Fetching orders for email:", email);

        // Connect to the database
        const db = await connectToDatabase();
        const orderCollection = db.collection('order_details'); // Access the `order_details` collection

        // Fetch all orders for the given email
        const orders = await orderCollection.find({ userId: email }).toArray();

        // Return the fetched orders as a response
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
}



module.exports = { getuserInfo,getOrderPer };
