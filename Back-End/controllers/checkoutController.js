const { connectToDatabase } = require('../config/database');

const getUserAddress = async (req, res) => {
    const { userid } = req.body;

    try {
        const collection = (await connectToDatabase()).collection('userinfo');
        const user = await collection.findOne({ email: userid });

        // If user or address fields are missing, return an empty string for each field
        const address = {
            house_detail: user?.house_detail || '',
            areaDetail: user?.areaDetail || '',
            landmark: user?.landmark || '',
            pincode: user?.pincode || '',
            city: user?.city || '',
            state: user?.state || ''
        };

        res.status(200).json({ address });
    } catch (error) {
        console.error("Error fetching user address:", error);
        res.status(500).json({ error: "An error occurred while retrieving the address." });
    }
};

module.exports = { getUserAddress };
