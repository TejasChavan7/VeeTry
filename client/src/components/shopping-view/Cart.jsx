import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import axios from 'axios';

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.salePrice || item.price;
    return total + price * item.quantity;
  }, 0);

  const handlePaypalCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/shop/order/create', {
        userId: user?.id,
        cartItems: cartItems.map(item => ({
          productId: item.productId,
          title: item.title,
          price: item.price,
          salePrice: item.salePrice,
          quantity: item.quantity,
        })),
        addressInfo: {}, // Add your address info here if needed
        orderStatus: "pending",
        paymentMethod: "paypal",
        paymentStatus: "pending",
        totalAmount,
        orderDate: new Date().toISOString(),
        orderUpdateDate: new Date().toISOString(),
        cartId: "", // Add cartId if available in your state
      });

      const { approvalURL } = response.data;

      if (approvalURL) {
        // Redirect to PayPal for payment approval
        window.location.href = approvalURL;
      } else {
        toast({
          title: "Error creating PayPal order",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error initiating PayPal checkout:', error);
      toast({
        title: "Error initiating PayPal checkout",
        description: error.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.productId} className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg">{item.title}</h3>
                <p>₹{item.salePrice || item.price} x {item.quantity}</p>
              </div>
              <p>₹{(item.salePrice || item.price) * item.quantity}</p>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-xl font-bold">Total: ₹{totalAmount.toFixed(2)}</h3>
            <Button
              onClick={handlePaypalCheckout}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
              disabled={cartItems.length === 0}
            >
              Checkout with PayPal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;