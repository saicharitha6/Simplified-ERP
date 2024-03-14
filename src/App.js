import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage";
import Cart from "./components/Cart/Cart";
import { CartProvider } from './components/context/CartContext';
import SideMenu from "./screens/Menu/SideMenu";
import Dashboard from './components/Dashboard/dashboard';
import ProductList from './screens/Products/products';
import AddProductForm from './screens/Products/AddProductForm';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <SideMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetailsPage />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/productForm" element={<AddProductForm />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
