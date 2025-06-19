import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

export default function OutfitDisplay({ outfit }) {
  const keys = ['men', 'women', 'accessories', 'footwear'];
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Function to handle adding to cart
  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  // Get available categories that have items
  const availableCategories = keys.filter(key => outfit[key]);

  return (
    <motion.div 
      className="p-6 bg-white rounded-2xl shadow-xl backdrop-blur-md bg-opacity-80 border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-center mb-8"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-hue">
          Your Custom Outfit
        </h2>
        <p className="text-gray-500 mt-2">Perfectly styled for your occasion</p>
      </motion.div>

      <div className="space-y-10">
        {keys.map((key) => {
          const item = outfit[key];
          
          return item ? (
            <motion.div 
              key={key}
              variants={itemVariants}
              className="transform transition-all duration-300 hover-lift"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-10"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full opacity-10"></div>
                
                <h3 className="text-2xl font-bold capitalize mb-4 text-indigo-800 flex items-center">
                  {key}
                  <span className="ml-3 h-px bg-gradient-to-r from-indigo-300 to-transparent flex-grow opacity-50"></span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <motion.div 
                    className="relative rounded-xl overflow-hidden shadow-lg"
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-br-lg font-bold flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                      FEATURED
                    </div>
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-red-500 to-red-600 text-white px-3 py-1 rounded-bl-lg font-bold">
                      {Math.round((1 - item.salePrice / item.price) * 100)}% OFF
                    </div>
                  </motion.div>
                  
                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h4>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <span className="text-xs ml-1 text-gray-500">(24 reviews)</span>
                      </div>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="line-through text-gray-400 text-sm">
                            ₹{item.price}
                          </span>
                          <span className="ml-2 text-2xl font-bold text-indigo-600">
                            ₹{item.salePrice}
                          </span>
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          {item.totalStock > 0 ? "In Stock" : "Out of Stock"}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            item.totalStock > 0
                              ? handleAddToCart(item._id, item.totalStock)
                              : toast({
                                  title: "Out of Stock",
                                  variant: "destructive",
                                })
                          }
                          disabled={item.totalStock === 0}
                          className={`px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-bold flex items-center justify-center ${
                            item.totalStock === 0 ? "opacity-60 cursor-not-allowed" : ""
                          }`}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null;
        })}
      </div>
    </motion.div>
  );
}