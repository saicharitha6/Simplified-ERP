import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch all categories
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        const fetchCategoryImages = async () => {
          const categoriesWithImages = await Promise.all(data.map(async category => {
            try {
              const response = await fetch(`https://dummyjson.com/products/category/${category}`);
              if (!response.ok) {
                throw new Error('Failed to fetch category products');
              }
              const products = await response.json();
              const imageUrl = products.products.length > 0 ? products.products[0].thumbnail : '';
              return { category, imageUrl };
            } catch (error) {
              console.error(`Error fetching image for ${category}:`, error);
              return { category, imageUrl: '' };
            }
          }));
          setCategories(categoriesWithImages);
          setLoading(false);
        };

        fetchCategoryImages();
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.homePage}>
      <h1>Product Categories</h1>
      <div className={styles.categoryList}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          categories.map(({ category, imageUrl }) => (
            <Link to={`/category/${category}`} key={category} className={styles.category}>
              {imageUrl && <img src={imageUrl} alt={category} />}
              <h2>{category}</h2>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
