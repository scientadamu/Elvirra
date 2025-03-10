import React, { useState, useEffect } from "react";
import "./History.css";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [newSale, setNewSale] = useState({ date: "", item: "", quantity: "", amount: "", unitPrice: "" });
  const [filter, setFilter] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    fetch("/elviralData.json")
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (data && Array.isArray(data.transactions)) {
          const salesData = data.transactions.filter(transaction => transaction.type?.toLowerCase() === "sale");
          setSales(salesData);
          setFilteredSales(salesData);
        } else {
          setError("Invalid data format");
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleInputChange = e => {
    setNewSale({ ...newSale, [e.target.name]: e.target.value });
  };

  const handleAddSale = e => {
    e.preventDefault();
    if (!newSale.date || !newSale.item || !newSale.quantity || !newSale.amount || !newSale.unitPrice) {
      alert("Please fill all fields.");
      return;
    }

    const updatedSales = [
      ...sales,
      {
        ...newSale,
        quantity: Number(newSale.quantity),
        amount: Number(newSale.amount),
        unitPrice: Number(newSale.unitPrice),
        type: "sale",
      },
    ];

    setSales(updatedSales);
    setFilteredSales(updatedSales);
    setNewSale({ date: "", item: "", quantity: "", amount: "", unitPrice: "" });
    setShowForm(false);
  };

  const handleFilterChange = e => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleFilterSales = () => {
    if (filter.startDate && filter.endDate) {
      const filtered = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(filter.startDate) && saleDate <= new Date(filter.endDate);
      });
      setFilteredSales(filtered);
    } else {
      alert("Please select both start and end dates.");
    }
  };

  const calculateTotal = salesToCalculate => salesToCalculate.reduce((total, sale) => total + (sale.amount || 0), 0);

  const formatCurrency = (amount) => {
    return amount && !isNaN(amount) ? amount.toLocaleString() : '₦0';
  };

  return (
    <div className="history-container">
      <h2>Welcome to Sales</h2>
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-btn">
        {showForm ? "Cancel" : "Add Sales Record"}
      </button>

      {showForm && (
        <form className="add-sales-form" onSubmit={handleAddSale}>
          {Object.keys(newSale).map(field => (
            <div key={field} className="form-field">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input type={field === "date" ? "date" : "text"} name={field} value={newSale[field]} onChange={handleInputChange} required />
            </div>
          ))}
          <button type="submit">Add Sale</button>
        </form>
      )}

      <button onClick={() => setShowFilterForm(!showFilterForm)} className="toggle-filter-btn">
        {showFilterForm ? "Cancel Filter" : "Filter Sales Records"}
      </button>

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

      <h2 className="historyTitle">Sales History</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading ? <p>Loading sales records...</p> : filteredSales.length === 0 ? <p>No sales records available.</p> : (
        <>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price (₦)</th>
                <th>Amount (₦)</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.date}</td>
                  <td>{sale.item}</td>
                  <td>{sale.quantity}</td>
                  <td>₦{formatCurrency(sale.unitPrice)}</td>
                  <td>₦{formatCurrency(sale.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <h3>Total: ₦{formatCurrency(calculateTotal(filteredSales))}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesHistory;
