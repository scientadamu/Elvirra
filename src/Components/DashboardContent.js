import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./DashboardContent.css";

const DashboardContent = () => {
  // Sales Data for Chart (From the provided sales history)
  const salesData = {
    labels: ["Jan", "Feb"], // Displaying Sales Data for January and February
    datasets: [
      {
        label: "Sales (₦)",
        data: [160000, 140000], // Example Sales Data for January and February (can be replaced with dynamic data)
        backgroundColor: "#36A2EB",
      },
    ],
  };

  // Purchase Data for Chart (2/3 of sales amounts for the total purchase calculation)
  const purchaseData = {
    labels: ["Jan", "Feb"], // Displaying Purchase Data for January and February
    datasets: [
      {
        label: "Purchases (₦)",
        data: [106667, 93333], // Total Purchase for January and February (2/3 of Sales)
        backgroundColor: "#FF9F40",
      },
    ],
  };

  // Example Records for Recent Transactions (Using provided purchase data)
  const recentTransactions = [
    { date: "Jan 2, 2025", item: "Bread", category: "Groceries", amount: 10000, type: "Purchase" },
    { date: "Jan 5, 2025", item: "Milk", category: "Groceries", amount: 8000, type: "Purchase" },
    { date: "Jan 10, 2025", item: "Eggs", category: "Food", amount: 12000, type: "Purchase" },
    { date: "Jan 15, 2025", item: "Rice", category: "Groceries", amount: 24000, type: "Purchase" },
    { date: "Jan 20, 2025", item: "Butter", category: "Food", amount: 8400, type: "Purchase" },
    { date: "Feb 3, 2025", item: "Salt", category: "Groceries", amount: 2500, type: "Purchase" },
    { date: "Feb 6, 2025", item: "Noodles", category: "Food", amount: 9000, type: "Purchase" },
    { date: "Feb 9, 2025", item: "Tomato Paste", category: "Groceries", amount: 8400, type: "Purchase" },
    { date: "Feb 12, 2025", item: "Margarine", category: "Food", amount: 4800, type: "Purchase" },
    { date: "Feb 15, 2025", item: "Cereal", category: "Food", amount: 12000, type: "Purchase" },
    { date: "Feb 20, 2025", item: "Butter", category: "Food", amount: 12000, type: "Purchase" },
    { date: "Feb 25, 2025", item: "Noodles", category: "Food", amount: 10000, type: "Purchase" },
    { date: "Jan 10, 2025", item: "Laptop Sale", category: "Electronics", amount: 60000, type: "Sale" },
    { date: "Feb 8, 2025", item: "Smartphone Sale", category: "Electronics", amount: 50000, type: "Sale" },
  ];

  // Total Sales and Purchases for Overview Cards
  const totalSales = 160000 + 140000; // Sum of sales for January and February
  const totalPurchases = (106667 + 93333); // Sum of purchases for January and February
  const profit = totalSales - totalPurchases;

  return (
    <div className="dashboard-content">
      <h1>Welcome to Your Dashboard</h1>

      {/* Overview Cards */}
      <div className="dashboard-overview">
        <div className="card">💰 Total Budget: <span>₦500,000</span></div>
        <div className="card">📉 Total Purchases: <span>₦{totalPurchases.toLocaleString()}</span></div>
        <div className="card">💵 Total Sales: <span>₦{totalSales.toLocaleString()}</span></div>
        <div className="card">📊 Profit: <span>₦{profit.toLocaleString()}</span></div>
      </div>

      {/* Charts Section */}
      <div className="charts">
        <div className="chart">
          <h3>Sales vs Purchases Breakdown</h3>
          <Bar
            data={{
              labels: ["Jan", "Feb"],
              datasets: [
                {
                  label: "Sales (₦)",
                  data: [160000, 140000],
                  backgroundColor: "#36A2EB",
                },
                {
                  label: "Purchases (₦)",
                  data: [106667, 93333],
                  backgroundColor: "#FF9F40",
                },
              ],
            }}
          />
        </div>
        <div className="chart">
          <h3>Sales vs Purchases Comparison</h3>
          <Doughnut
            data={{
              labels: ["Sales", "Purchases"],
              datasets: [
                {
                  label: "Sales vs Purchases",
                  data: [totalSales, totalPurchases],
                  backgroundColor: ["#36A2EB", "#FF9F40"],
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.item}</td>
                <td>{transaction.category}</td>
                <td>₦{transaction.amount.toLocaleString()}</td>
                <td>{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn">➕ Add Budget</button>
        <button className="action-btn">📌 Track Expenses</button>
        <button className="action-btn">📑 View Reports</button>
      </div>
    </div>
  );
};

export default DashboardContent;
