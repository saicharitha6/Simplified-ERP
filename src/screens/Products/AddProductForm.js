import React, { useState,useEffect } from 'react';
import { addProduct, getInventory } from '../../components/DummyAPI/index';

const AddProductForm = ({navigateBack}) => {
    const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    getInventory()
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleAddProduct = (newProduct) => {
    addProduct(newProduct)
      .then((data) => setProducts([...products, data]))
      .catch((error) => console.error('Error adding product:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct(formData);
    setFormData({ title: '', category: '', price: '', stock: '' });
    navigateBack();
  };

  return (
    <div style={styles.card}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Stock Quantity:</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
        </div>
        <button type="submit" style={styles.addButton}>Add Product</button>
      </form>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    marginBottom: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    marginTop:'10%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems:'start',

  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  label: {
    marginRight: '10px',
    width: '120px', // Set the width of the label
  },
  addButton: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default AddProductForm;
