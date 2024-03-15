export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};


// Function to add a new product
export const addProduct = (productData) => {
  return fetch("https://dummyjson.com/products/add", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  }).then((res) => res.json());
};

// Function to edit an existing product
export const editProduct = (productId, updatedProductData) => {
  return fetch(`https://dummyjson.com/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProductData),
  }).then((res) => res.json());
};

// Function to delete an existing product
export const deleteProduct = (productId) => {
  return fetch(`https://dummyjson.com/products/${productId}`, {
    method: 'DELETE',
  }).then((res) => res.json());
};

