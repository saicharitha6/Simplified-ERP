// Cart.js
import React, { useContext } from 'react';
import CartContext from '../context/CartContext'; // Import CartContext
import styles from './Cart.module.css'; // Import modular CSS

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext); // Access cartItems and functions from CartContext

  // Function to remove an item from the cart
  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  // Function to clear the cart
  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div>
      <h2 className={styles.head}>Cart</h2>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>ProductName</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td> {item.title}</td>
              <td>${item.price}</td>
              <td>
                <button className={styles.remove} onClick={() => handleRemoveFromCart(item)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.clear} onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
