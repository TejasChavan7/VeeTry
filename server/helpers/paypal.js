require('dotenv').config({ path: '../.env' });

const paypal = require('paypal-rest-sdk');

try {
    console.log("PAYPAL_CLIENT_ID:", process.env.PAYPAL_CLIENT_ID);
    console.log("PAYPAL_SECRET:", process.env.PAYPAL_SECRET);

    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET) {
        throw new Error('PayPal credentials are missing in .env file');
    }

    paypal.configure({
        mode: 'sandbox', // Change to 'live' for production
        client_id: process.env.PAYPAL_CLIENT_ID,
        client_secret: process.env.PAYPAL_SECRET,
        log: false,
    });

    console.log("PayPal configured successfully.");
} catch (error) {
    console.error('Error initializing PayPal SDK:', error.message);
}

module.exports = paypal;