import React from 'react';
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';

function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Cancelled</h2>
      <p>Your payment was cancelled. You can continue shopping or try again.</p>
      <Button onClick={() => navigate('/shop/home')} className="mt-4">
        Back to Home
      </Button>
    </div>
  );
}

export default Cancel;