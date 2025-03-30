import React, { useState, useEffect } from "react";
import "./SetBudget.css";

const SetBudget = () => {
  const [budgetName, setBudgetName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [elviralData, setElviralData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isBudgetSaved, setIsBudgetSaved] = useState(false);

  // Get the next month and onward
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-based index (Jan = 0, Feb = 1, etc.)
  const months = [
    "January 2025", "February 2025", "March 2025", "April 2025",
    "May 2025", "June 2025", "July 2025", "August 2025",
    "September 2025", "October 2025", "November 2025", "December 2025"
  ];
  const availableMonths = months.slice(currentMonth + 1); // Start from next month

  // Fetch elviralData.json from the public folder
  useEffect(() => {
    fetch("/elviralData.json")
      .then((response) => response.json())
      .then((data) => {
        setElviralData(data.transactions); // Extract transactions

        // Get unique categories from the data
        const uniqueCategories = [...new Set(data.transactions.map((item) => item.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!budgetName || !category || !amount) {
      alert("Please fill in all fields");
      return;
    }

    const newBudget = {
      id: budgets.length + 1,
      name: budgetName,
      category,
      amount: parseFloat(amount),
    };

    setBudgets([...budgets, newBudget]);
    setCategory(""); // Reset category selection
    setAmount(""); // Reset amount field
    setIsBudgetSaved(true); // Enable month selection after saving
  };

  // Handle Month Click (Calculate Totals)
  const handleMonthClick = (month) => {
    if (!elviralData || elviralData.length === 0) {
      alert(`No data available for ${month}`);
      return;
    }

    // Extract month in YYYY-MM format
    const monthIndex = months.indexOf(month) + 1;
    const monthString = `2025-${monthIndex.toString().padStart(2, "0")}`; // Format: 2025-01, 2025-02, etc.

    // Filter transactions for the selected month
    const monthTransactions = elviralData.filter(({ date }) => date.startsWith(monthString));

    if (monthTransactions.length === 0) {
      alert(`No transactions available for ${month}`);
      return;
    }

    // Sum totalPurchases and totalExpenditures
    const totalPurchases = monthTransactions
      .filter(({ type }) => type === "purchase")
      .reduce((sum, { amount }) => sum + parseFloat(amount), 0);

    const totalExpenditures = monthTransactions
      .filter(({ type }) => type === "expenditure")
      .reduce((sum, { amount }) => sum + parseFloat(amount), 0);

    setSelectedMonth(month);
    setMonthlyData({
      totalPurchases,
      totalExpenditures,
    });
  };

  // Get already selected categories
  const selectedCategories = budgets.map((b) => b.category);

  return (
    <div className="set-budget">
      <h2>Set Your Budget</h2>

      {/* Budget Form */}
      <form onSubmit={handleAddBudget}>
        <label>Budget Name:</label>
        <select 
          value={budgetName} 
          onChange={(e) => setBudgetName(e.target.value)} 
          required 
          disabled={isBudgetSaved} // Disable until budget is saved
        >
          <option value="">Select a month</option>
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} disabled={selectedCategories.includes(cat)}>
              {cat} {selectedCategories.includes(cat) ? "(Already Set)" : ""}
            </option>
          ))}
        </select>

        <label>Amount (₦):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />

        <button type="submit">Add Budget</button>
      </form>

      {/* Display already set categories */}
      {budgets.length > 0 && (
        <div className="set-categories">
          <h3>Set Categories</h3>
          <ul>
            {budgets.map((b) => (
              <li key={b.id}>
                <strong>{b.category}:</strong> ₦{b.amount.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Budget Summary (Clickable Buttons) */}
      <h3>Budget Summary</h3>
      <div className="budget-list">
        {months.slice(0, 4).map((month) => (
          <button key={month} className="budget-item" onClick={() => handleMonthClick(month)}>
            {month}
          </button>
        ))}
      </div>

      {/* Budget Details (Shown After Clicking a Month) */}
      {selectedMonth && monthlyData && (
        <div className="budget-details">
          <h3>{selectedMonth} Budget Details</h3>
          <p><strong>Total Purchases:</strong> ₦{monthlyData.totalPurchases.toLocaleString()}</p>
          <p><strong>Total Expenditures:</strong> ₦{monthlyData.totalExpenditures.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default SetBudget;
