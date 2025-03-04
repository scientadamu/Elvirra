import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./DashboardContent.css";

const DashboardContent = () => {
  // Sample Data for Charts
  const expenseData = {
    labels: ["Food", "Groceries", "Utilities", "Transport", "Entertainment", "Shopping"],
    datasets: [
      {
        label: "Expenses",
        data: [50000, 40000, 30000, 20000, 30000, 30000], // Total: 200,000
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF", "#FF9F40"],
      },
    ],
  };

  const salesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Sales (₦)",
        data: [60000, 50000, 70000, 60000], // Total: 240,000
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div className="dashboard-content">
      <h1>Welcome to Your Dashboard</h1>

      {/* Overview Cards */}
      <div className="dashboard-overview">
        <div className="card">💰 Total Budget: <span>₦500,000</span></div>
        <div className="card">📉 Expenses: <span>₦200,000</span></div>
        <div className="card">💵 Sales: <span>₦240,000</span></div>
        <div className="card">📊 Profit: <span>₦40,000</span></div>
      </div>

      {/* Charts Section */}
      <div className="charts">
        <div className="chart">
          <h3>Expense Breakdown</h3>
          <Doughnut data={expenseData} />
        </div>
        <div className="chart">
          <h3>Sales Performance</h3>
          <Bar data={salesData} />
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
            </tr>
          </thead>
          <tbody>
            <tr><td>Feb 5, 2025</td><td>Supermarket Groceries</td><td>Food</td><td>₦50,000</td></tr>
            <tr><td>Feb 8, 2025</td><td>Electric Bill</td><td>Utilities</td><td>₦30,000</td></tr>
            <tr><td>Feb 12, 2025</td><td>Fuel</td><td>Transport</td><td>₦20,000</td></tr>
            <tr><td>Feb 14, 2025</td><td>Clothing</td><td>Shopping</td><td>₦30,000</td></tr>
            <tr><td>Feb 20, 2025</td><td>Streaming Subscription</td><td>Entertainment</td><td>₦20,000</td></tr>
            <tr><td>Feb 22, 2025</td><td>Weekend Outing</td><td>Entertainment</td><td>₦10,000</td></tr>
            <tr><td>Feb 25, 2025</td><td>Home Groceries</td><td>Groceries</td><td>₦40,000</td></tr>
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
