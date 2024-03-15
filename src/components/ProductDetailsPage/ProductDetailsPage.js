import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInventory } from '../DummyAPI/index'; // Import the getInventory function
import styles from './ProductDetailsPage.module.css'; // Import modular CSS
import CartContext from '../context/CartContext'; // Import CartContext

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Access addToCart function from CartContext
  const [isAdded, setIsAdded] = useState(false); // State to track if the item is added to the cart

  useEffect(() => {
    getInventory()
      .then(data => {
        if (!Array.isArray(data.products)) {
          throw new Error('Products data is not an array');
        }
        const foundProduct = data.products.find(product => product.id === parseInt(productId));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.log('Product not found');
        }
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);



  const handleAddToCart = () => {
    if (!isAdded) { // Check if the item is not already added to the cart
      addToCart(product); // Add the product to the cart
      setIsAdded(true); // Set isAdded to true to disable the button
    } else {
      alert('This product is already added to the cart.'); // Show alert message if already added
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.productDetails}>
      <div className={styles.imageContainer}>
        <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
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
