// Dashboard.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { getCustomers, getInventory, getOrders, getRevenue } from "../DummyAPI/index";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./dashboard.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

  return (
    <Space size={20} direction="vertical" className={styles.container}>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal" className={styles.cardContainer}>
        <Link to="/productlist" className={styles.cardLink}>
          <DashboardCard
            icon={<ShoppingOutlined className={styles.icon} />}
            title={"Total Products"}
            value={inventory}
          />
        </Link>
        <Link to="/customerPage" className={styles.cardLink}>
          <DashboardCard
            icon={<UserOutlined className={styles.icon} />}
            title={"Customers"}
            value={customers}
          />
        </Link>
        <Link to="/Orders" className={styles.cardLink}>
          <DashboardCard
            icon={<UserOutlined className={styles.icon} />}
            title={"Orders"}
            value={orders}
          />
        </Link>
        <DashboardCard
          icon={<DollarCircleOutlined className={styles.icon} />}
          title={"Revenue"}
          value={revenue}
        />
      </Space>
      <Space className={styles.chartContainer}>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card className={styles.card}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => `User-${cart.userId}`);
      const data = res.carts.map((cart) => cart.discountedTotal);

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setRevenueData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card className={styles.chartContainer}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
}

export default Dashboard;
