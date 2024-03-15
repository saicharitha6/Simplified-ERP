// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Home.module.css'; // Import modular CSS
// import products from '../products'; // Import the products.js file

// const Home = () => {
//   // Extract unique categories from products
//   const uniqueCategories = [...new Set(products.map(product => product.category))];

//   return (
//     <div className={styles.homePage}>
//       <h1>Product Categories</h1>
//       <div className={styles.categoryList}>
//         {uniqueCategories.map(category => {
//           return (
//             <Link to={`/category/${category}`} key={category} className={styles.category}>
//               {/* Use a placeholder image or the first product's image for the category */}
//               <img src={products.find(product => product.category === category)?.image || ''} alt={category} />
//               <h2>{category}</h2>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Home;
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
        setCategories(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchCategoryImages = async () => {
      const categoriesWithImages = await Promise.all(categories.map(async category => {
        try {
          const response = await fetch(`https://dummyjson.com/products/category/${category}`);
          if (!response.ok) {
            throw new Error('Failed to fetch category products');
          }
          const products = await response.json();
          const imageUrl = products.products.length > 0 ? products.products[0].thumbnail : ''; // Get the first image URL from category products
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
  }, [categories]);

  return (
    <div className={styles.homePage}>
      <h1>Product Categories</h1>
      <div className={styles.categoryList}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          categories.map(({ category, imageUrl }) => (
            <Link to={`/category/${category}`} key={category} className={styles.category}>
              <img src={imageUrl} alt={category} />
              <h2>{category}</h2> {/* Render category string, not the object */}
            </Link>
          ))
        )}
      </div>
    </div>
  );  
  console.log(categories);
  // return (
  //   <div className={styles.homePage}>
  //     <h1>Product Categories</h1>
  //     <div className={styles.categoryList}>
  //       {loading ? (
  //         <p>Loading...</p>
  //       ) : (
  //         categories.map(({ category, imageUrl }) => (
  //           <Link to={`/category/${category}`} key={`${category}-${imageUrl}`} className={styles.category}>
  //             {imageUrl && <img src={imageUrl} alt={category} />}
  //             <h2>{category}</h2>
  //           </Link>
  //         ))
  //       )}
  //     </div>
  //   </div>
  // );
  
  
  

};

export default Home;
