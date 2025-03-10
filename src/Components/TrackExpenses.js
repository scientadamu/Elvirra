import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./TrackExpenses.css";

const TrackExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/elviralData.json") // Ensure the correct path to JSON file
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data); // Log to verify structure

        if (data && Array.isArray(data.expenses)) {
          const sortedExpenses = [...data.expenses].sort((a, b) => {
            return new Date(b.date) - new Date(a.date); // Sort descending
          });

          setExpenses(sortedExpenses);
        } else {
          setError("No expenses data found in the response.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
        setError("There was an issue loading the data. Please try again.");
        setLoading(false);
      });
  }, []);

  // Calculate total sales and purchases
  const totalSales = expenses
    .filter((t) => t.type === "sale")
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalPurchases = expenses
    .filter((t) => t.type === "purchase")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  // Data for the Doughnut chart
  const expenseData = {
    labels: ["Sales", "Purchases"],
    datasets: [
      {
        label: "Transactions (₦)",
        data: [totalSales, totalPurchases],
        backgroundColor: ["#4CAF50", "#FF6384"],
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="track-expenses">
      <h1>Track Expenses</h1>

      {/* Summary */}
      <div className="total-summary">
        <p>Total Sales: ₦{totalSales.toLocaleString()}</p>
        <p>Total Purchases: ₦{totalPurchases.toLocaleString()}</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Doughnut Chart */}
      <div className="charts" style={{ width: "50%", margin: "0 auto" }}>
        <div className="chart">
          <h3>Expense Breakdown</h3>
          <Doughnut data={expenseData} width={200} height={200} />
        </div>
      </div>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Expense History */}
      <div className="expense-history">
        <h3>All Expenses</h3>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Unit Price (₦)</th>
              <th>Amount (₦)</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .filter((expense) =>
                expense.item?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((expense, index) => (
                <tr key={index} style={{ color: "black" }}>
                  <td>{new Date(expense.date).toLocaleString()}</td>
                  <td>{expense.item || "N/A"}</td>
                  <td>₦{(expense.unitPrice || 0).toLocaleString()}</td>
                  <td style={{ color: expense.type === "sale" ? "green" : "pink" }}>
                    ₦{(expense.amount || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackExpenses;
