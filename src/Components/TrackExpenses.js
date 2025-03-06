// TrackExpenses.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./TrackExpenses.css"; // Ensure you have a separate CSS for styling

const TrackExpenses = () => {
  // Sample data for expense categories
  const expenseData = {
    labels: ["Food", "Groceries", "Utilities", "Transport", "Entertainment", "Shopping"],
    datasets: [
      {
        label: "Expenses (₦)",
        data: [50000, 40000, 30000, 20000, 30000, 30000], // Total: 200,000
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF", "#FF9F40"],
      },
    ],
  };

  // Expense History Table (similar to recent transactions)
  const expenseHistory = [
    { date: "Jan 5, 2025", item: "Supermarket Groceries", category: "Food", amount: 50000 },
    { date: "Jan 10, 2025", item: "Electric Bill", category: "Utilities", amount: 30000 },
    { date: "Jan 12, 2025", item: "Fuel", category: "Transport", amount: 20000 },
    { date: "Jan 20, 2025", item: "Streaming Subscription", category: "Entertainment", amount: 20000 },
    { date: "Jan 25, 2025", item: "Clothing", category: "Shopping", amount: 30000 },
    { date: "Feb 3, 2025", item: "Weekend Outing", category: "Entertainment", amount: 10000 },
    { date: "Feb 6, 2025", item: "Home Groceries", category: "Groceries", amount: 40000 },
    { date: "Feb 8, 2025", item: "Streaming Subscription", category: "Entertainment", amount: 20000 },
    { date: "Feb 12, 2025", item: "Transport", category: "Transport", amount: 30000 },
    { date: "Feb 20, 2025", item: "Clothing", category: "Shopping", amount: 30000 },
  ];

  return (
    <div className="track-expenses">
      <h1>Track Expenses</h1>

      {/* Expense Breakdown Chart */}
      <div className="charts">
        <div className="chart">
          <h3>Expense Breakdown</h3>
          <Doughnut data={expenseData} />
        </div>
      </div>

      {/* Expense History Table */}
      <div className="expense-history">
        <h3>Expense History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Category</th>
              <th>Amount (₦)</th>
            </tr>
          </thead>
          <tbody>
            {expenseHistory.map((expense, index) => (
              <tr key={index}>
                <td>{expense.date}</td>
                <td>{expense.item}</td>
                <td>{expense.category}</td>
                <td>₦{expense.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn">📌 Add Expense</button>
        <button className="action-btn">📑 View Detailed Reports</button>
      </div>
    </div>
  );
};

export default TrackExpenses;
