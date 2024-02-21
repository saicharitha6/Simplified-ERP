import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../products';
import styles from './ProductDetailsPage.module.css'; // Import modular CSS
import CartContext from '../context/CartContext'; // Import CartContext

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const product = products.find(product => product.id === parseInt(productId));
  const { addToCart } = useContext(CartContext); // Access addToCart function from CartContext
  const [isAdded, setIsAdded] = useState(false); // State to track if the item is added to the cart

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    if (!isAdded) { // Check if the item is not already added to the cart
      addToCart(product); // Add the product to the cart
      setIsAdded(true); // Set isAdded to true to disable the button
    } else {
      alert('This product is already added to the cart.'); // Show alert message if already added
    }
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.productImage} />
      </div>
      <div className={styles.detailsContainer}>
        <h2>{product.title}</h2>
        <p>Description: {product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
        {/* Add more details as needed */}
        <button className={styles.button} onClick={handleAddToCart} disabled={isAdded}>
          {isAdded ? 'Added to Cart' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
