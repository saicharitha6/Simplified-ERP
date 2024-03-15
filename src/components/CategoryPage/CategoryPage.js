// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import ProductCard from '../ProductCard/ProductCard';
// import styles from './CategoryPage.module.css';
// import productsData from '../products';

// const CategoryPage = () => {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);
//   const [sortBy, setSortBy] = useState('price'); // Default sort by price

//   useEffect(() => {
//     // Filter products based on the selected category
//     const filteredProducts = productsData.filter(product => product.category === category);
//     // Sort the filtered products based on the selected criteria
//     const sortedProducts = sortProducts(filteredProducts, sortBy);
//     setProducts(sortedProducts);
//   }, [category, sortBy]);

//   // Function to sort products based on selected criteria
//   const sortProducts = (products, sortBy) => {
//     return [...products].sort((a, b) => {
//       if (sortBy === 'price') {
//         return a.price - b.price;
//       } else if (sortBy === 'popularity') {
//         // Add logic for sorting by popularity
//       }
//       // Add more sorting criteria as needed
//     });
//   };

//   // Handle change in sorting criteria
//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   return (
//     <div className={styles.categoryPage}>
//       <h1 className={styles.product}>{category} Products</h1>
//       {/* Sorting options */}
//       <div className={styles.sortOptions}>
//         <label>Sort by:</label>
//         <select value={sortBy} onChange={handleSortChange}>
//           <option value="price">Price</option>
//           <option value="popularity">Popularity</option>
//           {/* Add more sorting options as needed */}
//         </select>
//       </div>
//       <div className={styles.productList}>
//         {/* Map through products and wrap each ProductCard with a Link */}
//         {products.map(product => (
//           <Link to={`/product/${product.id}`} key={product.id} className={styles.productLink}>
//             <ProductCard product={product} />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import styles from './CategoryPage.module.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json(); // Convert response to JSON
      })
      .then(data => {
        // Handle the JSON data
        console.log(data);
        const filteredProducts = data.products.filter(product => product.category === category);
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className={styles.categoryPage}>
      <h1 className={styles.product}>{category} Products</h1>
      <div className={styles.productList}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          /* Map through filtered products and wrap each ProductCard with a Link */
          products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className={styles.productLink}>
              <ProductCard product={product} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
