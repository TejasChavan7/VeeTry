import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useToast } from "../ui/use-toast";
import { clearCart } from '@/store/shop/cart-slice';
import { Button } from "../ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Success() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paymentId = query.get('paymentId');
    const payerId = query.get('PayerID');
    const orderId = query.get('orderId'); // You might need to store orderId in localStorage or state after createOrder

    const capturePayment = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/shop/order/capture', {
          paymentId,
          payerId,
          orderId: localStorage.getItem('orderId'), // Retrieve orderId from localStorage
        });

        if (response.data.success) {
          dispatch(clearCart());
          toast({
            title: "Payment Successful",
            description: "Thank you for your purchase!",
          });
          localStorage.removeItem('orderId'); // Clean up
        }
      } catch (error) {
        console.error('Error capturing payment:', error);
        toast({
          title: "Error capturing payment",
          description: error.response?.data?.message || "An unexpected error occurred",
          variant: "destructive",
        });
      }
    };

    if (paymentId && payerId) {
      capturePayment();
    }
  }, [dispatch, toast, location]);

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Successful</h2>
      <p>Thank you for your purchase! Your order has been placed.</p>
      <Button onClick={() => navigate('/shop/home')} className="mt-4">
        Continue Shopping
      </Button>
    </div>
  );
}

export default Success;