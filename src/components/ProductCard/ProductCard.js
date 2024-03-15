import React from 'react';
import styles from './ProductCard.module.css'; // Import modular CSS for ProductCard

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        {/* <p className={styles.productDescription}>{product.description}</p> */}
        <p className={styles.productPrice}>Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
