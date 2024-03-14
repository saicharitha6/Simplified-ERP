// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleChange}
      style={{
        width: '300px', // Adjust the width as needed
        height: '30px', // Adjust the height as needed
        fontSize: '16px', // Adjust the font size as needed
        padding: '8px', // Add padding for better appearance
        margin:'10px',
        borderRadius: '8px', // Add border radius for rounded corners
        border: '1px solid #ccc', // Add a border for better visibility
      }}
    />
  );
};

export default SearchBar;
