// ProductItem.js
import React, { useState } from 'react';
import styles from './ProductItem.module.css'; // Import CSS file for styling

const ProductItem = ({ product, handleEditProduct, handleDeleteProduct }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleEditProduct(editedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProduct({ ...product });
  };

  return (
    <div className={styles.productCard}>
      {!isEditing ? (
        <div>
          <h3>{product.title}</h3>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>Stock Quantity: {product.stock}</p>
          <div className={styles.buttonContainer}>
            <button className={styles.save} onClick={handleEdit}>Edit</button>
            <button className={styles.delete} onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        </div>
      ) : (
        <div>
          <input type="text" name="name" value={editedProduct.title} onChange={handleChange} />
          <input type="text" name="category" value={editedProduct.category} onChange={handleChange} />
          <input type="number" name="price" value={editedProduct.price} onChange={handleChange} />
          <input
            type="number"
            name="stockQuantity"
            value={editedProduct.stock}
            onChange={handleChange}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.save} onClick={handleSave}>Save</button>
            <button className={styles.delete} onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
