import React, { useState, useEffect } from "react";
import "./History.css";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [showFilterForm, setShowFilterForm] = useState(false); // Toggle filter form visibility
  const [newSale, setNewSale] = useState({ date: "", item: "", quantity: "", amount: "" });
  const [filter, setFilter] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    fetch("/recordData.json")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("✅ Full fetched data:", data);
        if (data && Array.isArray(data.sales)) {
          setSales(data.sales);
          setFilteredSales(data.sales); // Set filtered sales to all sales initially
        } else {
          console.error("❌ Data structure is incorrect:", data);
          setError("Data format is incorrect");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading sales data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setNewSale({ ...newSale, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleAddSale = (e) => {
    e.preventDefault();

    if (!newSale.date || !newSale.item || !newSale.quantity || !newSale.amount) {
      alert("Please fill all fields.");
      return;
    }

    const updatedSales = [...sales, { 
      ...newSale, 
      quantity: Number(newSale.quantity), 
      amount: Number(newSale.amount) 
    }];

    setSales(updatedSales); // Update UI state
    setNewSale({ date: "", item: "", quantity: "", amount: "" }); // Reset form
    setShowForm(false); // Hide form after submission

    // Simulate writing to a JSON file (since frontend can't update JSON directly)
    console.log("📝 Updated Sales:", updatedSales);
    alert("New sale added! (Note: JSON file isn't actually updated in frontend-only apps)");
  };

  // Handle filter input change
  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  // Filter sales records based on date range
  const handleFilterSales = () => {
    if (filter.startDate && filter.endDate) {
      const filtered = sales.filter((sale) => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(filter.startDate) && saleDate <= new Date(filter.endDate);
      });
      setFilteredSales(filtered);
    } else {
      alert("Please select both start and end dates.");
    }
  };

  // Calculate total amount for the displayed records
  const calculateTotal = (salesToCalculate) => {
    return salesToCalculate.reduce((total, sale) => total + sale.amount, 0);
  };

  return (
    <div className="history-container">
      {/* Sales Header Text before Add Sales Record button */}
      <h2>Welcome to Sales</h2>

      {/* Add Sales Record Button */}
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-btn">
        {showForm ? "Cancel" : "Add Sales Record"}
      </button>

      {/* Sales Form (Shown if Button is Clicked) */}
      {showForm && (
        <form className="add-sales-form" onSubmit={handleAddSale}>
          <div className="form-field">
            <label>Date:</label>
            <input type="date" name="date" value={newSale.date} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label>Item:</label>
            <input type="text" name="item" value={newSale.item} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label>Quantity:</label>
            <input type="number" name="quantity" value={newSale.quantity} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label>Amount (₦):</label>
            <input type="number" name="amount" value={newSale.amount} onChange={handleInputChange} required />
          </div>
          <button type="submit">Add Sale</button>
        </form>
      )}

      {/* Filter Sales Button */}
      <button onClick={() => setShowFilterForm(!showFilterForm)} className="toggle-filter-btn">
        {showFilterForm ? "Cancel Filter" : "Filter Sales Records"}
      </button>

      {/* Filter Form (Shown if Button is Clicked) */}
      {showFilterForm && (
        <form className="filter-form">
          <div className="form-field">
            <label>Start Date:</label>
            <input type="date" name="startDate" value={filter.startDate} onChange={handleFilterChange} required />
          </div>
          <div className="form-field">
            <label>End Date:</label>
            <input type="date" name="endDate" value={filter.endDate} onChange={handleFilterChange} required />
          </div>
          <button type="button" onClick={handleFilterSales}>Apply Filter</button>
        </form>
      )}

      {/* Sales Header Text after Filter Button and before the List */}
      <h2 className="historyTitle">Sales History </h2>

      {/* Debugging Information */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading && <p>Loading sales records...</p>}
      {!loading && !error && sales.length === 0 && <p>No sales records available.</p>}

      {/* Display Sales Records */}
      {filteredSales.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Amount (₦)</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.date}</td>
                  <td>{sale.item}</td>
                  <td>{sale.quantity}</td>
                  <td>₦{sale.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Show Total */}
          <div className="total">
            <h3>Total: ₦{calculateTotal(filteredSales).toLocaleString()}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesHistory;
