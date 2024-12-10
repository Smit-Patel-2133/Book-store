    const express = require('express');
    const { getBooks, updateBook,getOrderDetail, addBook, getOverview, getPendingDeliveryRequests,requestReject,requestApprove,
        getDeliveryPerson,
        orderApprove
    } = require("../controllers/adminController");

    const router = express.Router();

    router.post('/books', getBooks);
    router.put('/books/:id', updateBook); // Add this line for updating a book
    router.get('/orderDetail', getOrderDetail);  // Corrected route
    router.post('/addBook', addBook);
    router.post('/overview',getOverview)
    router.get('/deliveryPerson',getPendingDeliveryRequests)
    router.get('/getThedeliveryPerson', getDeliveryPerson);
    router.post('/order/approve',orderApprove)
    router.post('/deliveryPerson/approve', requestApprove);
    router.post('/deliveryPerson/reject', requestReject);
    module.exports = router;
