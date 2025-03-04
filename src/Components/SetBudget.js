import React, { useState } from "react";
import "./SetBudget.css";

const SetBudget = () => {
  const [budgetName, setBudgetName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);

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
    setBudgetName("");
    setCategory("");
    setAmount("");
  };

  return (
    <div className="set-budget">
      <h2>Set Your Budget</h2>

      {/* Budget Form */}
      <form onSubmit={handleAddBudget}>
        <label>Budget Name:</label>
        <input
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          placeholder="Enter budget name"
          required
        />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
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

      {/* Budget List */}
      {budgets.length > 0 && (
        <div className="budget-list">
          <h3>Budget Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount (₦)</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((budget) => (
                <tr key={budget.id}>
                  <td>{budget.name}</td>
                  <td>{budget.category}</td>
                  <td>₦{budget.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SetBudget;
