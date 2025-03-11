import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./TrackExpenses.css";

const TrackExpenses = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(""); // New month filter state
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/elviralData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.transactions)) {
          const sortedTransactions = data.transactions.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setTransactions(sortedTransactions);
        } else {
          setError("No transactions data found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
        setError("There was an issue loading the data.");
        setLoading(false);
      });
  }, []);

  // Get list of months from transactions for dropdown
  const availableMonths = [
    ...new Set(
      transactions.map((t) => new Date(t.date).toLocaleString("default", { month: "long", year: "numeric" }))
    ),
  ];

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesSearch = t.item?.toLowerCase().includes(searchTerm.toLowerCase());
    const transactionMonth = new Date(t.date).toLocaleString("default", { month: "long", year: "numeric" });
    const matchesMonth = selectedMonth === "" || transactionMonth === selectedMonth;
    return matchesType && matchesSearch && matchesMonth;
  });

  const totalSales = filteredTransactions
    .filter((t) => t.type === "sale")
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalPurchases = filteredTransactions
    .filter((t) => t.type === "purchase")
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalExpenditures = filteredTransactions
    .filter((t) => t.type === "expenditure")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const expenseData = {
    labels: ["Sales", "Purchases", "Expenditures"],
    datasets: [
      {
        label: "Transactions (₦)",
        data: [totalSales, totalPurchases, totalExpenditures],
        backgroundColor: ["#4CAF50", "#FF6384", "#FFA500"],
      },
    ],
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="track-expenses">
      <h1>Track Expenses</h1>

      <div className="summary">
        <p><strong>Total Sales:</strong> ₦{totalSales.toLocaleString()}</p>
        <p><strong>Total Purchases:</strong> ₦{totalPurchases.toLocaleString()}</p>
        <p><strong>Total Expenditures:</strong> ₦{totalExpenditures.toLocaleString()}</p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Transactions</option>
          <option value="sale">Sales</option>
          <option value="purchase">Purchases</option>
          <option value="expenditure">Expenditures</option>
        </select>

        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">All Months</option>
          {availableMonths.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="chart-wrapper">
        <h3>Expense Breakdown</h3>
        <div className="chart-container">
          <Doughnut data={expenseData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="transaction-history">
        <h3>Transaction History</h3>
        {filteredTransactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Type</th>
                <th>Unit Price (₦)</th>
                <th>Amount (₦)</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.item || "N/A"}</td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color:
                        transaction.type === "sale"
                          ? "green"
                          : transaction.type === "purchase"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </td>
                  <td>₦{(transaction.unitPrice || 0).toLocaleString()}</td>
                  <td>₦{(transaction.amount || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TrackExpenses;
