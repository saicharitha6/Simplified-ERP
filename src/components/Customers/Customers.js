import React, { useState, useEffect } from 'react';
import styles from './Customer.module.css'; // Import modular CSS

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        console.log('Response from API:', data); // Log the response
        setCustomers(data.users); // Extract users array from the response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h2 style={{ marginTop: '5%' }}>Customer Page</h2>
      {loading ? (
        <p>Loading...</p>
      ) : customers.length > 0 ? (
        <table className={styles['table-container']}> {/* Apply the CSS class */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{`${customer.firstName} ${customer.lastName}`}</td>
                <td>{customer.email}</td>
                <td>{customer.address.address}</td>
                <td>{customer.address.city}</td>
                <td>{customer.address.postalCode}</td>
                <td>{customer.address.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No customers found.</p>
      )}
    </div>
  );
};

export default CustomerPage;
