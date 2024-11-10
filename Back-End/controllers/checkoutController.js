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
const saveAddress = async (req, res) => {
    const { userid, house_detail, areaDetail, landmark, pincode, city, state } = req.body;

    console.log("Received data:", { userid, house_detail, areaDetail, landmark, pincode, city, state });

    // Validate the input data
    if (!userid || !house_detail || !areaDetail || !landmark || !pincode || !city || !state) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const collection = (await connectToDatabase()).collection('userInfo');

        // Try to update the user's address (or add the address if it doesn't exist)
        const result = await collection.updateOne(
            { email: userid }, // find the user by email (userid)
            { $set: {
                    address: {
                        house_detail,
                        areaDetail,
                        landmark,
                        pincode,
                        city,
                        state
                    }
                }} // set the address fields (add if not exists)
        );



        console.log("Update result:", result);

        // Check if the address was actually modified or added
        if (result.modifiedCount === 0) {
            return res.status(200).send({ message: 'Address is already up-to-date' });
        }

        // Check if the user was found and address updated
        if (result.matchedCount === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Successfully updated the address
        res.status(200).send({ message: 'Address saved successfully' });
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).send({ message: 'Failed to save address' });
    }
};



module.exports = { getUserAddress,saveAddress };
