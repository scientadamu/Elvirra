import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [transactions, setTransactions] = useState([]); // Store transaction details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalPurchases: 0,
    totalExpenses: 0,
    totalProfit: 0,
    previousProfit: null,
  });

  const monthsMap = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/elviralData.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        const groupedData = {};
        let monthTransactions = {};

        data.transactions.forEach(({ date, amount, type, item }) => {
          const month = date.slice(5, 7);
          const monthName = monthsMap[parseInt(month, 10) - 1];

          if (!groupedData[monthName]) {
            groupedData[monthName] = { 
              month: monthName, totalSales: 0, totalPurchases: 0, totalExpenses: 0 
            };
            monthTransactions[monthName] = [];
          }

          // Accumulate amounts based on type
          if (type === "sale") {
            groupedData[monthName].totalSales += parseFloat(amount);
          } else if (type === "purchase") {
            groupedData[monthName].totalPurchases += parseFloat(amount);
          } else if (type === "expenditure") {
            groupedData[monthName].totalExpenses += parseFloat(amount);
          }

          // Store transactions
          monthTransactions[monthName].push({ date, type, amount, item });
        });

        let filteredData = Object.values(groupedData);
        let selectedTransactions = [];

        if (selectedMonth !== "all") {
          filteredData = filteredData.filter((data) => data.month === selectedMonth);
          selectedTransactions = monthTransactions[selectedMonth] || [];
        } else {
          selectedTransactions = Object.values(monthTransactions).flat();
        }

        // Sort transactions by date (newest first)
        selectedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Calculate Summary Values
        let totalSales = 0, totalPurchases = 0, totalExpenses = 0;
        filteredData.forEach((data) => {
          totalSales += data.totalSales;
          totalPurchases += data.totalPurchases;
          totalExpenses += data.totalExpenses;
        });

        const totalProfit = totalSales - totalPurchases - totalExpenses;

        // Get previous month's profit
        let previousProfit = null;
        if (selectedMonth !== "all") {
          const currentIndex = monthsMap.indexOf(selectedMonth);
          if (currentIndex > 0) {
            const previousMonth = monthsMap[currentIndex - 1];
            if (groupedData[previousMonth]) {
              previousProfit = groupedData[previousMonth].totalSales - 
                groupedData[previousMonth].totalPurchases - 
                groupedData[previousMonth].totalExpenses;
            }
          }
        }

        setSummary({ totalSales, totalPurchases, totalExpenses, totalProfit, previousProfit });
        setReportData(filteredData);
        setTransactions(selectedTransactions);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Monthly Financial Report</h2>

      {/* Month Filter */}
      <div className="filter-container mb-4">
        <label htmlFor="monthSelect" className="filter-label">Select Month:</label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="filter-select"
        >
          <option value="all">All Months</option>
          {monthsMap.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* Chart Display */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : reportData.length === 0 ? (
        <p className="text-center text-gray-500">No data available.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={reportData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSales" fill="#4caf50" name="Total Sales" />
              <Bar dataKey="totalPurchases" fill="#2196f3" name="Total Purchases" />
              <Bar dataKey="totalExpenses" fill="#f44336" name="Total Expenses" />
            </BarChart>
          </ResponsiveContainer>

          {/* Transactions Table */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Transaction Details</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Item Name</th>
                  <th className="border p-2">Type</th>
                  <th className="border p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((txn, index) => (
                    <tr key={index} className="text-center border-t">
                      <td className="border p-2">{txn.date}</td>
                      <td className="border p-2">{txn.item || "Unknown Item"}</td> 
                      <td className="border p-2">{txn.type}</td>
                      <td className="border p-2">₦{parseFloat(txn.amount).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-2">No transactions available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Comparison */}
          <div className="mt-6 p-4 border rounded-lg bg-gray-100">
            <h3 className="font-semibold text-lg mb-2">Summary Report</h3>
            <p>Total Sales: ₦{summary.totalSales.toLocaleString()}</p>
            <p>Total Purchases: ₦{summary.totalPurchases.toLocaleString()}</p>
            <p>Total Expenses: ₦{summary.totalExpenses.toLocaleString()}</p>
            <p>Total Profit/Loss: ₦{summary.totalProfit.toLocaleString()}</p>
            {summary.previousProfit !== null && (
              <p>Previous Month Profit: ₦{summary.previousProfit.toLocaleString()}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
