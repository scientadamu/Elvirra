import React, { useState } from "react";
import "./History.css";

const SalesHistory = () => {
  // Sample sales data
  const [salesData, setSalesData] = useState([
    { date: "Jan 2, 2025", item: "Laptop", quantity: 5, amount: 50000 },
    { date: "Jan 5, 2025", item: "Phone", quantity: 8, amount: 80000 },
    { date: "Jan 10, 2025", item: "Headphones", quantity: 15, amount: 45000 },
    { date: "Jan 15, 2025", item: "Mouse", quantity: 12, amount: 24000 },
    { date: "Jan 20, 2025", item: "Keyboard", quantity: 7, amount: 21000 },
    { date: "Feb 3, 2025", item: "Monitor", quantity: 4, amount: 40000 },
    { date: "Feb 6, 2025", item: "Router", quantity: 10, amount: 30000 },
    { date: "Feb 9, 2025", item: "Charger", quantity: 18, amount: 18000 },
    { date: "Feb 12, 2025", item: "Printer", quantity: 6, amount: 12000 },
    { date: "Feb 15, 2025", item: "Scanner", quantity: 5, amount: 25000 },
    { date: "Feb 20, 2025", item: "Tablet", quantity: 8, amount: 64000 },
    { date: "Feb 25, 2025", item: "Speaker", quantity: 7, amount: 21000 },
  ]);

  const [selectedMonth, setSelectedMonth] = useState("All");
  const [newSale, setNewSale] = useState({
    date: "",
    item: "",
    quantity: "",
    amount: "",
  });

  // Function to handle new sale form submission
  const handleAddSale = (e) => {
    e.preventDefault();
    const { date, item, quantity, amount } = newSale;

    if (date && item && quantity && amount) {
      const newSaleRecord = {
        date,
        item,
        quantity: Number(quantity),
        amount: Number(amount),
      };
      setSalesData((prevData) => [...prevData, newSaleRecord]);
      setNewSale({ date: "", item: "", quantity: "", amount: "" });
    }
  };

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSale((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to filter sales by month
  const filterByMonth = (data, month) => {
    if (month === "All") return data;
    return data.filter((item) => new Date(item.date).getMonth() === month);
  };

  // Generate months (0 = January, 11 = December)
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Convert month name to number (0-11)
  const selectedMonthIndex = selectedMonth === "All" ? "All" : months.indexOf(selectedMonth);

  // Ensure salesData is an array
  const safeSalesData = Array.isArray(salesData) ? salesData : [];
  const filteredSales = filterByMonth(safeSalesData, selectedMonthIndex);

  // Calculate total sales amount
  const totalSalesAmount = filteredSales.reduce((total, sale) => total + sale.amount, 0);

  return (
    <div className="history-container">
      <h2> Add Sales Record</h2>

      {/* Form to Add New Sale Record */}
      <form className="add-sale-form" onSubmit={handleAddSale}>
        <div className="form-field">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newSale.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Item:</label>
          <input
            type="text"
            name="item"
            value={newSale.item}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={newSale.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Amount (₦):</label>
          <input
            type="number"
            name="amount"
            value={newSale.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Sale</button>
      </form>

      {/* Month Selection Buttons */}
      <h2>Sales History</h2>
      <div className="month-buttons">
        <button className={selectedMonth === "All" ? "active" : ""} onClick={() => setSelectedMonth("All")}>
          All Months
        </button>
        {months.map((month, index) => (
          <button key={index} className={selectedMonth === month ? "active" : ""} onClick={() => setSelectedMonth(month)}>
            {month}
          </button>
        ))}
      </div>

      {/* Display the Selected Month Above the Table */}
      <div className="selected-month">
        <h3>Sales for {selectedMonth === "All" ? "All Months" : selectedMonth}</h3>
      </div>

      {/* Show Sales Only If Data Exists */}
      {filteredSales.length > 0 ? (
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

          {/* Display the Total Sales Amount at the End of the Table */}
          <div className="total-row">
            <strong>Total Sales: ₦{totalSalesAmount.toLocaleString()}</strong>
          </div>
        </>
      ) : (
        <p className="no-data">No sales records available for {selectedMonth}.</p>
      )}
    </div>
  );
};

export default SalesHistory;
