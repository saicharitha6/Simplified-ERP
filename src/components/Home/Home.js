import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; // Import modular CSS
import products from '../products'; // Import the products.js file

const Home = () => {
  // Extract unique categories from products
  const uniqueCategories = [...new Set(products.map(product => product.category))];

  return (
    <div className={styles.homePage}>
      <h1>Product Categories</h1>
      <div className={styles.categoryList}>
        {uniqueCategories.map(category => {
          return (
            <Link to={`/category/${category}`} key={category} className={styles.category}>
              {/* Use a placeholder image or the first product's image for the category */}
              <img src={products.find(product => product.category === category)?.image || ''} alt={category} />
              <h2>{category}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
