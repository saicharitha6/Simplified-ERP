// App.js
import './App.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage";
import Cart from "./components/Cart/Cart";
import { CartProvider } from './components/context/CartContext'; 

const App = () => {
  return (
    <CartProvider>
    <Router>
      <div className="App">
        <h1 className='top'>Medusa Store</h1>
        <div className="home"> <NavLink className="nav" to="/">HOME</NavLink></div>
        <div className="cart-icon">
          {/* Use Link or NavLink to navigate */}  
          <NavLink to="/cart">
            <img src={require('./assests/cart.jpg')} className="cart-image" alt="Cart" />
          </NavLink>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </CartProvider>
  );
};

export default App;
