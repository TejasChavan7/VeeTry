import React, { createContext, useState, useContext } from 'react';

export const OutfitContext = createContext(undefined);

export const useOutfitContext = () => {
  const context = useContext(OutfitContext);
  if (!context) {
    throw new Error('useOutfitContext must be used within an OutfitProvider');
  }
  return context;
};

export const OutfitProvider = ({ children }) => {
  const [outfit, setOutfit] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateOutfit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/outfit/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch outfit');
      }

      const data = await response.json();
      setOutfit(Object.values(data)); // Convert outfit object to array for rendering
      const total = Object.values(data).reduce((sum, item) => {
        return sum + (item.salePrice > 0 ? item.salePrice : item.price);
      }, 0);
      setTotalPrice(total);
    } catch (err) {
      setError('Error connecting to server. Please try again.');
      console.error('Error generating outfit:', err);
    } finally {
      setLoading(false);
    }
  };

  const buyAllItems = () => {
    if (outfit.length === 0) {
      setError('No outfit items to buy.');
      return;
    }
    alert('Outfit items added to cart! (Mock action)');
  };

  const clearOutfit = () => {
    setOutfit([]);
    setTotalPrice(0);
    setError(null);
  };

  return (
    <OutfitContext.Provider
      value={{
        outfit,
        totalPrice,
        loading,
        error,
        generateOutfit,
        buyAllItems,
        clearOutfit,
      }}
    >
      {children}
    </OutfitContext.Provider>
  );
};