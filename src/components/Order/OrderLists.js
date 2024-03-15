import React, { useState } from 'react';
import styles from './OrderList.module.css';

const OrderLists = () => {
    // Mock data for orders
    const mockOrders = [
        { id: 1, customerId: 101, customerName: 'John Doe', orderDate: '2024-03-15', status: 'Pending' },
        { id: 2, customerId: 102, customerName: 'Jane Smith', orderDate: '2024-03-16', status: 'Processing' },
        { id: 3, customerId: 103, customerName: 'Alice Johnson', orderDate: '2024-03-17', status: 'Shipped' },
        { id: 4, customerId: 104, customerName: 'Bob Brown', orderDate: '2024-03-18', status: 'Delivered' },
        { id: 5, customerId: 105, customerName: 'Akrain', orderDate: '2024-03-18', status: 'Pending' },
        { id: 6, customerId: 106, customerName: 'Sai', orderDate: '2024-03-17', status: 'Delivered' },
        { id: 7, customerId: 107, customerName: 'Bob', orderDate: '2024-03-16', status: 'Shipped' },
        { id: 8, customerId: 108, customerName: 'Babu', orderDate: '2024-03-16', status: 'Delivered' },
        { id: 9, customerId: 109, customerName: 'Liche vante', orderDate: '2024-03-18', status: 'Delivered' },
    ];

    // State to manage orders
    const [orders, setOrders] = useState(mockOrders);
    // State to manage selected order for viewing details or updating status
    const [selectedOrder, setSelectedOrder] = useState(null);
    // State to manage new status for order
    const [newStatus, setNewStatus] = useState('');

    // Function to delete an order
    const deleteOrder = (orderId) => {
        const updatedOrders = orders.filter(order => order.id !== orderId);
        setOrders(updatedOrders);
    };

    // Function to handle updating order status
    const updateStatus = () => {
        if (!newStatus.trim()) return; // Prevent updating with empty status
        const updatedOrders = orders.map(order => {
            if (order.id === selectedOrder.id) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);
        setSelectedOrder(null); // Reset selected order after updating status
        setNewStatus(''); // Reset new status input field
    };

    // Function to show order details
    const showOrderDetails = (orderId) => {
        const order = orders.find(order => order.id === orderId);
        setSelectedOrder(order);
    };

    return (
        <div className={styles.tableContainer}>
            <h2 className={styles.head}>Order List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customerName}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => showOrderDetails(order.id)}>Details</button>
                                <button onClick={() => deleteOrder(order.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedOrder && (
                <div className={styles.orderCard}>
                    <h2>Order Details</h2>
                    <p>Order ID: {selectedOrder.id}</p>
                    <p>Customer Name: {selectedOrder.customerName}</p>
                    <p>Order Date: {selectedOrder.orderDate}</p>
                    <p>Status: {selectedOrder.status}</p>
                    <div className={styles.statusUpdate}>
                        <input
                            type="text"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            placeholder="New Status"
                        />
                        <button onClick={updateStatus}>Update Status</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default OrderLists;