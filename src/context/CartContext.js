import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(()=>{
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  
  const addToCart = (product) => {
    setCart((prevCart) => {
      
      const productExists = prevCart.some((item) => item.sorteoId === product.sorteoId);
      if (productExists) {
        return prevCart.map((item) =>
          item.sorteoId === product.sorteoId ? { ...item, quantity: item.quantity + 1 } : item
        ); 
      }
      return [...prevCart, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_,i) => i !== index));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.sorteoId === productId ? { ...item, quantity: item.quantity + quantity } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};