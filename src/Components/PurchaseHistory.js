import React, { useState, useEffect } from "react";
import "./History.css";

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [showFilterForm, setShowFilterForm] = useState(false); // Toggle filter form visibility
  const [newPurchase, setNewPurchase] = useState({ date: "", item: "", quantity: "", amount: "" });
  const [filter, setFilter] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    fetch("/recordData.json")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("✅ Full fetched data:", data);
        if (data && Array.isArray(data.purchases)) {
          setPurchases(data.purchases);
          setFilteredPurchases(data.purchases); // Set filtered purchases to all purchases initially
        } else {
          console.error("❌ Data structure is incorrect:", data);
          setError("Data format is incorrect");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading purchase data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setNewPurchase({ ...newPurchase, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleAddPurchase = (e) => {
    e.preventDefault();

    if (!newPurchase.date || !newPurchase.item || !newPurchase.quantity || !newPurchase.amount) {
      alert("Please fill all fields.");
      return;
    }

    const updatedPurchases = [
      ...purchases,
      { ...newPurchase, quantity: Number(newPurchase.quantity), amount: Number(newPurchase.amount) },
    ];

    setPurchases(updatedPurchases); // Update UI state
    setNewPurchase({ date: "", item: "", quantity: "", amount: "" }); // Reset form
    setShowForm(false); // Hide form after submission

    // Simulate writing to a JSON file (since frontend can't update JSON directly)
    console.log("📝 Updated Purchases:", updatedPurchases);
    alert("New purchase added! (Note: JSON file isn't actually updated in frontend-only apps)");
  };

  // Handle filter input change
  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  // Filter purchase records based on date range
  const handleFilterPurchases = () => {
    if (filter.startDate && filter.endDate) {
      const filtered = purchases.filter((purchase) => {
        const purchaseDate = new Date(purchase.date);
        return purchaseDate >= new Date(filter.startDate) && purchaseDate <= new Date(filter.endDate);
      });
      setFilteredPurchases(filtered);
    } else {
      alert("Please select both start and end dates.");
    }
  };

  // Calculate total amount for the displayed records
  const calculateTotal = (purchasesToCalculate) => {
    return purchasesToCalculate.reduce((total, purchase) => total + purchase.amount, 0);
  };

  return (
    <div className="history-container">
      {/* Purchase Header Text before Add Purchase Record button */}
      <h2>Welcome to Purchase History</h2>

      {/* Add Purchase Record Button */}
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-btn">
        {showForm ? "Cancel" : "Add Purchase Record"}
      </button>

      {/* Purchase Form (Shown if Button is Clicked) */}
      {showForm && (
        <form className="add-purchase-form" onSubmit={handleAddPurchase}>
          <div className="form-field">
            <label>Date:</label>
            <input type="date" name="date" value={newPurchase.date} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label>Item:</label>
            <input type="text" name="item" value={newPurchase.item} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label>Quantity:</label>
            <input type="number" name="quantity" value={newPurchase.quantity} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label>Amount (₦):</label>
            <input type="number" name="amount" value={newPurchase.amount} onChange={handleInputChange} required />
          </div>
          <button type="submit">Add Purchase</button>
        </form>
      )}

      {/* Filter Purchases Button */}
      <button onClick={() => setShowFilterForm(!showFilterForm)} className="toggle-filter-btn">
        {showFilterForm ? "Cancel Filter" : "Filter Purchase Records"}
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
          <button type="button" onClick={handleFilterPurchases}>Apply Filter</button>
        </form>
      )}

      {/* Purchase Header Text after Filter Button and before the List */}
      <h2 className="historyTitle">Purchase History</h2>

      {/* Debugging Information */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading && <p>Loading purchase records...</p>}
      {!loading && !error && purchases.length === 0 && <p>No purchase records available.</p>}

      {/* Display Purchase Records */}
      {filteredPurchases.length > 0 && (
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
              {filteredPurchases.map((purchase, index) => (
                <tr key={index}>
                  <td>{purchase.date}</td>
                  <td>{purchase.item}</td>
                  <td>{purchase.quantity}</td>
                  <td>₦{purchase.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Show Total */}
          <div className="total">
            <h3>Total: ₦{calculateTotal(filteredPurchases).toLocaleString()}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseHistory;
