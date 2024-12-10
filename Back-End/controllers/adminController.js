const { connectToDatabase } = require('../config/database');
const mongoose = require('mongoose'); // Add this line

async function getBooks(req, res) {
    console.log("Fetching books fro admin");
    const db = await connectToDatabase(); // Await the database connection
    const collection = db.collection('books_info'); // Access the collection here

    try {
        const books = await collection.find().toArray();
        res.status(200).json(books); // Send the response back
    } catch (error) {
        console.error('Failed to fetch books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
}

async function updateBook(req, res) {
    console.log("Entering updateBook function");
    const { id } = req.params; // Get the book ID from the URL parameters
    const updatedData = req.body; // Get the updated book data from the request body

    // Filter out the _id field from the updatedData object
    const { _id, ...dataToUpdate } = updatedData;

    const db = await connectToDatabase(); // Await the database connection
    const collection = db.collection('books_info'); // Access the collection here

    try {
        console.log("Updating book with ID:", id);
        console.log("Updated data:", dataToUpdate);

        // Update the book in the database
        const result = await collection.updateOne(
            { _id: new mongoose.Types.ObjectId(id) }, // Filter by ID
            { $set: dataToUpdate } // Update the document with new data
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Book not found or no changes made' });
        }

        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error('Failed to update book:', error);
        res.status(500).json({ error: 'Failed to update book' });
    }
}

async function getOrderDetail(req, res) {
    try {
        console.log("Fetching pending order details...");

        // Connect to the database
        const db = await connectToDatabase();
        const collection = db.collection('order_details');

        // Fetch orders with status "Pending" and convert the cursor to an array
        const pendingOrders = await collection.find({ status: "Pending" }).toArray();

        // Return an empty array if no pending orders are found
        return res.status(200).json(pendingOrders);

    } catch (e) {
        console.error("Error fetching order details:", e);
        return res.status(500).json({ message: "Internal server error." });
    }
}

async function addBook(req,res){
    try{
        console.log("adding")
        const db = await connectToDatabase();
        const collection = db.collection('books_info');
        const add=await collection.insertOne(req.body);
        console.log(add)
        return res.status(200).json({ message: "book added" });

    }catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'Failed to add book' });

    }
}
async function getOverview(req, res) {
    try {
        const db = await connectToDatabase();

        // Total Users Count
        const userCollection = db.collection('userInfo');
        const totalUsers = await userCollection.countDocuments();

        // New Users in the Last Week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newUsers = await userCollection.countDocuments({
            registeredAt: { $gte: oneWeekAgo }
        });

        // Total Books Count
        const bookCollection = db.collection('books_info');
        const totalBooks = await bookCollection.countDocuments();

        // Total Sales
        const orderCollection = db.collection('order_details');
        const totalSalesData = await orderCollection.aggregate([
            { $group: { _id: null, totalSales: { $sum: "$orderAmount" } } }
        ]).toArray();
        const totalSales = totalSalesData.length > 0 ? totalSalesData[0].totalSales : 0;

        // Delivery Person Requests (Pending)
        const deliveryPersonCollection = db.collection('deliveryPerson');
        const pendingDeliveryRequests = await deliveryPersonCollection.countDocuments({
            status: "Pending"
        });

        // Approved Delivery Persons
        const approvedDeliveryPersons = await deliveryPersonCollection.countDocuments({
            status: "Approved"
        });

        // Log statistics for debugging
        console.log(
            totalSales,
            totalUsers,
            newUsers,
            totalBooks,
            pendingDeliveryRequests,
            approvedDeliveryPersons
        );

        // Return the statistics
        res.status(200).json({
            totalSales,
            totalUsers,
            newUsers,
            totalBooks,
            newBooks: 0, // Placeholder if needed later
            pendingDeliveryRequests,
            approvedDeliveryPersons
        });
    } catch (e) {
        console.error("Error in getOverview:", e);
        res.status(500).json({ error: "Failed to fetch overview data" });
    }
}

async function getPendingDeliveryRequests(req, res) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('deliveryPerson');

        // Fetch all records where status is 'Pending'
        const pendingRequests = await collection.find({ status: "Pending" }).toArray();
        // console.log("request",pendingRequests)
        res.status(200).json(pendingRequests);
    } catch (e) {
        console.error("Error fetching pending delivery requests:", e);
        res.status(500).json({ error: "An error occurred while fetching pending delivery requests." });
    }
}
async function requestApprove(req, res) {
    const { email } = req.body; // Use email instead of id
    try {
        const db = await connectToDatabase();
        const collection = db.collection('deliveryPerson');
        const updatedPerson = await collection.findOneAndUpdate(
            { email: email }, // Match by email
            { $set: { status: 'Approved' } },
            { returnDocument: 'after' } // Return the updated document
        );



        res.json({ message: 'Delivery person approved successfully', updatedPerson: updatedPerson.value });
    } catch (error) {
        console.error('Error approving delivery person:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function requestReject(req, res) {
    const { email } = req.body; // Use email instead of id
    try {
        const db = await connectToDatabase();
        const collection = db.collection('deliveryPerson');
        const updatedPerson = await collection.findOneAndUpdate(
            { email: email }, // Match by email
            { $set: { status: 'Rejected' } },
            { returnDocument: 'after' } // Return the updated document
        );



        res.json({ message: 'Delivery person rejected successfully', updatedPerson: updatedPerson.value });
    } catch (error) {
        console.error('Error rejecting delivery person:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getDeliveryPerson(req, res) {
    try {
        console.log("i am hera");
        const db = await connectToDatabase();
        const collection = db.collection('deliveryPerson');

        // Fetch the documents as an array
        const deliveryPersons = await collection
            .find(
                { status: 'Approved' },
                { projection: { firstName: 1, lastName: 1, city: 1, pincode: 1,email:1, _id: 0 } } // Project only specific fields
            )
            .toArray();

        // Send the array as a JSON response
        res.status(200).json(deliveryPersons);
    } catch (e) {
        console.error('Error fetching delivery persons:', e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
async function orderApprove(req, res) {
    try {
        console.log("i am there ")
        const { orderId, email } = req.body; // Extract orderId and email from the request body
        const db = await connectToDatabase(); // Connect to the database

        const deliveryPersonCollection = db.collection('deliveryPerson');
        const orderDetailsCollection = db.collection('order_details');

        // Fetch delivery person details using email
        const deliveryPerson = await deliveryPersonCollection.findOne({ email });

        if (!deliveryPerson) {
            console.log("2")
            return res.status(404).json({ error: 'Delivery person not found' });
        }

        const { firstName, lastName, mobileNumber } = deliveryPerson;

        // Update the order_details collection
        const result = await orderDetailsCollection.updateOne(
            { orderId }, // Match the orderId
            {
                $set: {
                    deliveryFirstName: firstName,
                    deliveryLastName: lastName,
                    deliveryMobileNumber: mobileNumber,
                    deliveryEmail:email,
                    status: 'Dispatched', // Update the status
                },
            }
        );
        console.log(result);
        if (result.modifiedCount === 0) {
            console.log("3")
            return res.status(404).json({ error: 'Order not found or not updated' });
        }

        res.status(200).json({ message: 'Order approved and updated successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while processing the order' });
    }
}




module.exports = { getBooks, updateBook, getOrderDetail, orderApprove,addBook,getDeliveryPerson, getOverview,getPendingDeliveryRequests,requestApprove,requestReject };