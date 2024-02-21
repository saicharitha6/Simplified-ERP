// CartContext.js
import React, { createContext, useState } from 'react';

// Create context
const CartContext = createContext();

// Create provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    // Check if the item already exists in the cart based on its ID
    const isItemInCart = cartItems.some(cartItem => cartItem.id === item.id);
  
    if (!isItemInCart) {
      // If the item is not in the cart, add it
      setCartItems([...cartItems, item]);
    } else {
      // If the item is already in the cart, display a message or handle it accordingly
      console.log('Item is already in the cart');
      alert("Already Added to Cart");
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
