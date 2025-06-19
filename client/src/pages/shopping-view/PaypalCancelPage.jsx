import React from 'react';
import { Button } from "../../components/ui/button";
import { useNavigate } from 'react-router-dom';

function PaypalCancelPage() {
  const navigate = useNavigate();

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Cancelled</h2>
      <p>Your payment was cancelled. You can continue shopping or try again.</p>
      <Button onClick={() => navigate('/shop/cart')} className="mt-4">
        Back to Cart
      </Button>
    </div>
  );
}

export default PaypalCancelPage;