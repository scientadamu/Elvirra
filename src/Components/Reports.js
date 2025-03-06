// Reports.js
import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Reports.css"; // Ensure you have a separate CSS for styling

const Reports = () => {
  // Sample data for reports (can be dynamically calculated from sales and expenses)
  const reportData = {
    labels: ["Jan", "Feb"],
    datasets: [
      {
        label: "Total Sales (₦)",
        data: [160000, 140000], // Example Sales Data for January and February
        backgroundColor: "#36A2EB",
      },
      {
        label: "Total Purchases (₦)",
        data: [106667, 93333], // Example Purchases Data for January and February
        backgroundColor: "#FF9F40",
      },
      {
        label: "Total Expenses (₦)",
        data: [200000, 180000], // Example Expenses Data for January and February
        backgroundColor: "#FF6384",
      },
      {
        label: "Profit (₦)",
        data: [40000, 40000], // Profit = Sales - Purchases
        backgroundColor: "#4CAF50",
      },
    ],
  };

  // Reports History (can be extended with more data)
  const reportHistory = [
    { date: "Jan 15, 2025", totalSales: 160000, totalPurchases: 106667, totalExpenses: 200000, profit: 40000 },
    { date: "Feb 18, 2025", totalSales: 140000, totalPurchases: 93333, totalExpenses: 180000, profit: 40000 },
  ];

  return (
    <div className="reports">
      <h1>Reports</h1>

      {/* Reports Data Visualization */}
      <div className="charts">
        <div className="chart">
          <h3>Monthly Financial Summary</h3>
          <Bar data={reportData} />
        </div>
      </div>

      {/* Reports History Table */}
      <div className="report-history">
        <h3>Reports History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Sales (₦)</th>
              <th>Total Purchases (₦)</th>
              <th>Total Expenses (₦)</th>
              <th>Profit (₦)</th>
            </tr>
          </thead>
          <tbody>
            {reportHistory.map((report, index) => (
              <tr key={index}>
                <td>{report.date}</td>
                <td>₦{report.totalSales.toLocaleString()}</td>
                <td>₦{report.totalPurchases.toLocaleString()}</td>
                <td>₦{report.totalExpenses.toLocaleString()}</td>
                <td>₦{report.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn">📑 Generate Report</button>
        <button className="action-btn">🔄 Update Records</button>
      </div>
    </div>
  );
};

export default Reports;
