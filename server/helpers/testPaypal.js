require('dotenv').config({ path: '../../.env' });
const PayPal = require('paypal-rest-sdk');

// Configure PayPal SDK
PayPal.configure({
    mode: 'sandbox', // Sandbox mode
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET,
});

// Test creating a payment
const testPayment = async () => {
    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        },
        transactions: [
            {
                amount: {
                    currency: 'USD',
                    total: '10.00',
                },
                description: 'Test payment',
            },
        ],
    };

    try {
        const payment = await new Promise((resolve, reject) => {
            PayPal.payment.create(create_payment_json, (err, payment) => {
                if (err) reject(err);
                resolve(payment);
            });
        });

        console.log('Payment created successfully:', payment);
    } catch (err) {
        console.error('Error creating payment:', err);
    }
};

testPayment();
console.log("Client ID:", process.env.PAYPAL_CLIENT_ID);
console.log("Secret:", process.env.PAYPAL_SECRET);
