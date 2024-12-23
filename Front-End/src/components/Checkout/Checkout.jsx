import React, {useEffect, useState, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';
import {load} from '@cashfreepayments/cashfree-js';
import {useSelector} from "react-redux";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {cartItems, user} = location.state || {cartItems: [], user: {}};
    const userId = user.email; // explicitly assign userId as user email

    const [orderId, setOrderId] = useState('');
    const [DELIVERY_CHARGE] = useState(99);
    const [userData, setUserData] = useState({
        name: user.name || '',
        email: user.email || '',
        mobile: '',
        address: {
            house_detail: '',
            areaDetail: '',
            landmark: '',
            pincode: '',
            city: '',
            state: ''
        }
    });

    console.log(cartItems)
    const [errors, setErrors] = useState({});
    const cashfreeRef = useRef(null);

    useEffect(() => {
        const initializeSDK = async () => {
            if (!cashfreeRef.current) {
                try {
                    cashfreeRef.current = await load({mode: "sandbox"});
                } catch (error) {
                    console.error("Cashfree SDK failed to load:", error);
                }
            }
        };
        initializeSDK();
    }, []);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/checkout/address', {userid: user.email});
                if (response.data && response.data.address) {
                    setUserData(prevData => ({
                        ...prevData,
                        address: response.data.address
                    }));
                }
            } catch (e) {
                console.error('Error fetching address:', e);
            }
        };

        if (user.email) {
            fetchAddress();
        }
    }, [user.email]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name in userData.address) {
            setUserData(prevData => ({
                ...prevData,
                address: {...prevData.address, [name]: value}
            }));
        } else {
            setUserData(prevData => ({...prevData, [name]: value}));
        }
        setErrors(prevErrors => ({...prevErrors, [name]: ''}));
    };

    const validateFields = () => {
        const newErrors = {};
        if (!userData.name) newErrors.name = 'Name is required';
        if (!userData.email) newErrors.email = 'Email is required';
        if (!userData.mobile) newErrors.mobile = 'Mobile number is required';
        if (!userData.address.house_detail) newErrors.house_detail = 'House/Flat Number is required';
        if (!userData.address.areaDetail) newErrors.areaDetail = 'Area/Street is required';
        if (!userData.address.landmark) newErrors.landmark = 'Landmark is required';
        if (!userData.address.pincode) newErrors.pincode = 'Pincode is required';
        if (!userData.address.city) newErrors.city = 'City is required';
        if (!userData.address.state) newErrors.state = 'State is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getSessionId = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/payment/sessionId', {
                price: grandTotal,
                name: userData.name,
                email: userData.email,
                mobile: userData.mobile
            });
            if (res.data && res.data.session_id) {
                setOrderId(res.data.order_id);
                return {session_id: res.data.session_id, order_id: res.data.order_id};
            }
        } catch (e) {
            console.log(e);
        }
    };
    console.log("dfsj:-", cartItems)
    const verifyPayment = async (orderId) => {
        try {
            const res = await axios.post('http://localhost:3000/api/payment/verify', {orderId});
            const paymentData = res.data[0];
            if (!paymentData) {
                console.error('Payment status not found in the response:', res.data);
                navigate('/payment-status', {state: {status: 'failed'}});
                return;
            }
            const paymentStatus = paymentData.payment_status === 'SUCCESS' ? 'success' : 'failed';
            if (paymentStatus === 'failed') {
                console.log('Payment failed, redirecting to payment status page with failed status');
                navigate('/payment-status', {state: {status: paymentStatus}});
                return;
            }
            const orderAmount = parseFloat(paymentData.order_amount);
            const paymentGroup = paymentData.payment_group;
            const paymentTime = new Date(paymentData.payment_time);
            const orderID = paymentData.order_id;
            const date = paymentTime.toISOString().split('T')[0];
            const time = paymentTime.toISOString().split('T')[1].split('.')[0];
            const itemDetails = cartItems.map((item) => ({
                itemId: item._id,
                title:item.title
            }));
            const paymentInfo = {
                orderId: orderID,
                orderAmount:orderAmount,
                date:date,
                time:time,
                paymentMode: paymentGroup,
                paymentStatus:paymentStatus,
                items: itemDetails,
                userId:userId
            };

            console.log('Payment Info:', paymentInfo.orderId);

            try{
                const res=await axios.post('http://localhost:3000/api/payment/order_details', {paymentInfo:paymentInfo})

            }catch (e) {
                console.log(e)
            }
            //write code here
            console.log("cart item after:- ",cartItems);
            const bookIds = cartItems.map(item => item._id);
            console.log("Book IDs: ", bookIds);
            try{
                const res=await axios.put('http://localhost:3000/api/payment/orderUpdate',{bookIds})
            }catch (e) {
                console.log(e)
            }
            console.log('Payment successful, redirecting to payment status page with payment info');
            navigate('/payment-status', {state: {status: paymentStatus, paymentInfo}});

        } catch (error) {
            console.error('Error during payment verification:', error);
            navigate('/payment-status', {state: {status: 'failed'}});
        }
    };



    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;
        if (!cashfreeRef.current) {
            console.error('Cashfree SDK not yet loaded');
            return;
        }

        const {session_id, order_id} = await getSessionId();
        if (!session_id) {
            console.error('Session ID not received');
            return;
        }


        const { house_detail, areaDetail, landmark, pincode, city, state } = userData.address;
        const number=userData.mobile
        const saveAddressRes = await axios.post('http://localhost:3000/api/checkout/saveAddress', {
            userid: user.email,
            house_detail,
            areaDetail,
            landmark,
            pincode,
            city,
            state,
            number: number
        });
        if (saveAddressRes.status !== 200) {
            console.error('Failed to save address');
            return;
        }
        const checkoutOptions = {
            paymentSessionId: session_id,
            redirectTarget: '_modal'
        };

        try {
            await cashfreeRef.current.checkout(checkoutOptions);
            if (order_id) {
                verifyPayment(order_id);
            } else {
                console.error('Order ID not available for verification');
            }
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    const totalPrice = cartItems.reduce((total, item) => {
        const discount = item.offer || 0;
        const price = parseFloat(item.price) || 0;
        const discountedPrice = price - (price * (discount / 100));
        return total + discountedPrice;
    }, 0);

    const grandTotal = totalPrice + DELIVERY_CHARGE;

    return (
        <div className="checkout-container">
            <h2 className="checkout-header">Checkout</h2>
            <div className="checkout-section">
                <label htmlFor="name">Name <span className="required">*</span></label>
                <input type="text" name="name" value={userData.name} onChange={handleInputChange} required/>
                {errors.name && <p className="error">{errors.name}</p>}

                <label htmlFor="email">Email <span className="required">*</span></label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    required
                    readOnly
                />
                {errors.email && <p className="error">{errors.email}</p>}


                <label htmlFor="mobile">Mobile Number <span className="required">*</span></label>
                <input type="text" name="mobile" value={userData.mobile} onChange={handleInputChange} required/>
                {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>

            <div className="checkout-section">
                <h3>Delivery Address</h3>
                <label htmlFor="house_detail">House/Flat Number <span className="required">*</span></label>
                <input type="text" name="house_detail" value={userData.address.house_detail}
                       onChange={handleInputChange} required/>
                {errors.house_detail && <p className="error">{errors.house_detail}</p>}

                <label htmlFor="areaDetail">Area/Street <span className="required">*</span></label>
                <input type="text" name="areaDetail" value={userData.address.areaDetail} onChange={handleInputChange}
                       required/>
                {errors.areaDetail && <p className="error">{errors.areaDetail}</p>}

                <label htmlFor="landmark">Landmark <span className="required">*</span></label>
                <input type="text" name="landmark" value={userData.address.landmark} onChange={handleInputChange}
                       required/>
                {errors.landmark && <p className="error">{errors.landmark}</p>}

                <label htmlFor="pincode">Pincode <span className="required">*</span></label>
                <input type="text" name="pincode" value={userData.address.pincode} onChange={handleInputChange}
                       required/>
                {errors.pincode && <p className="error">{errors.pincode}</p>}

                <label htmlFor="city">City <span className="required">*</span></label>
                <input type="text" name="city" value={userData.address.city} onChange={handleInputChange} required/>
                {errors.city && <p className="error">{errors.city}</p>}

                <label htmlFor="state">State <span className="required">*</span></label>
                <input type="text" name="state" value={userData.address.state} onChange={handleInputChange} required/>
                {errors.state && <p className="error">{errors.state}</p>}
            </div>

            <div className="checkout-summary">
                <h3 className="item-details-header">Order Summary</h3>
                <ul className="item-details-list">
                    {cartItems.map((item, index) => {
                        const discount = item.offer || 0;
                        const price = parseFloat(item.price) || 0;
                        const discountedPrice = price - (price * (discount / 100));
                        return (
                            <li key={index} className="item-detail">
                                <div className="cart-item-part-one">
                                    <img src={item.coverImg} alt={item.title} className="cart-item-image"/>
                                </div>
                                <div className="cart-item-part-two">
                                    <span className="item-title">{item.title}</span>
                                    <span className="item-original-price">Original Price: Rs.{price.toFixed(2)}</span>
                                    <span className="item-discount">Discount: {discount}%</span>
                                    <span
                                        className="item-current-price">Current Price: Rs.{discountedPrice.toFixed(2)}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                <p>Delivery Charge: ₹{DELIVERY_CHARGE}</p>
                <p>Grand Total: ₹{grandTotal.toFixed(2)}</p>
            </div>

            <button className="checkout-button" onClick={handleCheckout}>Proceed to Payment</button>
        </div>
    );
};

export default Checkout;
