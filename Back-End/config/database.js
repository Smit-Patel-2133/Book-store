const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // Ensure to load environment variables

const mongoURI = process.env.MONGO_URI ||"mongodb+srv://smit02042004:TObFfwtBpduoy170@authentication.nrgs5.mongodb.net/?retryWrites=true&w=majority&appName=Authentication";
const client = new MongoClient(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB!");
        return client.db('userDatabase'); // Adjust the database name as needed
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}

// Close the MongoDB client on application exit
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});

module.exports = { connectToDatabase, client };
