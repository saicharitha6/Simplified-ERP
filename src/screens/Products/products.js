import React, { useState, useEffect } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import AddProductForm from './AddProductForm';
import SearchBar from './SearchBar';
import { getInventory, addProduct, editProduct, deleteProduct } from '../../components/DummyAPI/index';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate(); // useNavigate hook

  const handleButtonClick = () => {
    // Use navigate() to navigate programmatically
    navigate('/productForm');
  };

  useEffect(() => {
    getInventory()
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // const handleAddProduct = (newProduct) => {
  //   addProduct(newProduct)
  //     .then((data) => setProducts([...products, data]))
  //     .catch((error) => console.error('Error adding product:', error));
  // };

  const handleEditProduct = (editedProduct) => {
    editProduct(editedProduct)
      .then((data) => {
        const updatedProducts = products.map((product) =>
          product.id === editedProduct.id ? editedProduct : product
        );
        setProducts(updatedProducts);
      })
      .catch((error) => console.error('Error editing product:', error));
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId)
      .then(() => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  const filteredProducts = products ? products.filter((product) =>
    product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div style={{ marginTop: "5%" }}>
      <h2 style={{ textAlign: 'start', paddingLeft: '20px' }}>PRODUCTS <button style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#000', color: "#fff", marginRight: "30%" }} onClick={handleButtonClick}>ADD Item</button>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#000', color: "#fff", alignItems: 'center' }} onClick={filteredProducts}>Search</button>
      </h2>
      {filteredProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      ))}
    </div>
  );
};

export default ProductList;
