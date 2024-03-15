import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../context/CartContext'; // Import CartContext
import styles from './Cart.module.css'; // Import modular CSS

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext); // Access cartItems and functions from CartContext
  const [totalPrice, setTotalPrice] = useState(0); // State to hold total price
  const [orderPlaced, setOrderPlaced] = useState(false); // State to track whether order is placed

  // Function to remove an item from the cart
  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  // Function to clear the cart
  const handleClearCart = () => {
    clearCart();
  };

  // Function to handle placing an order
  const handleOrder = () => {
    // Implement your logic for placing the order here
    console.log('Order placed!');
    setOrderPlaced(true); // Set orderPlaced to true when order is placed
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price;
    });
    setTotalPrice(total);
  };

  // Calculate total price on initial render and whenever cartItems change
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

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
      <div className={styles.total}>Total Price: ${totalPrice}</div><br />
      <button className={styles.clear} onClick={handleClearCart}>Clear Cart</button>
      <button className={styles.clear} onClick={handleOrder}>Place Order</button>

      {/* Popup for order confirmation */}
      {orderPlaced && (
        <div className={styles.orderPopup}>
          <h3>Order Placed Successfully!</h3>
          {/* <p>Your order has been placed successfully. Thank you!</p> */}
        </div>
      )}
    </div>
  );
};

export default Cart;
