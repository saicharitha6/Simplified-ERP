// ProductList.js
import React, { useState, useEffect } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import SearchBar from './SearchBar';
import { getInventory, deleteProduct } from '../../components/DummyAPI/index';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/productForm');
  };

  useEffect(() => {
    getInventory()
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId)
      .then(() => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredProducts = products.filter((product) =>
    (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h2 style={{ marginTop: "5%" }}>PRODUCTS
        {/* <button onClick={handleButtonClick}>ADD Item</button> */}
        <button style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#000', color: "#fff" }} onClick={handleButtonClick}>ADD Item</button>
        <SearchBar handleSearch={handleSearch} /> {/* Pass handleSearch function */}
      </h2>
      {filteredProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          handleDeleteProduct={handleDeleteProduct}
        />
      ))}
    </div>
  );
};

export default ProductList;
