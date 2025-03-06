import React, { useState } from "react";
import "./History.css";

const PurchaseHistory = () => {
  // Sample purchase data
  const [purchaseData, setPurchaseData] = useState([
    { date: "Jan 2, 2025", item: "Bread", quantity: 10, amount: 10000 },
    { date: "Jan 5, 2025", item: "Milk", quantity: 8, amount: 8000 },
    { date: "Jan 10, 2025", item: "Eggs", quantity: 20, amount: 12000 },
    { date: "Jan 15, 2025", item: "Rice", quantity: 6, amount: 24000 },
    { date: "Jan 20, 2025", item: "Butter", quantity: 7, amount: 8400 },
    { date: "Feb 3, 2025", item: "Salt", quantity: 25, amount: 2500 },
    { date: "Feb 6, 2025", item: "Noodles", quantity: 18, amount: 9000 },
    { date: "Feb 9, 2025", item: "Tomato Paste", quantity: 14, amount: 8400 },
    { date: "Feb 12, 2025", item: "Margarine", quantity: 8, amount: 4800 },
    { date: "Feb 15, 2025", item: "Cereal", quantity: 6, amount: 12000 },
    { date: "Feb 20, 2025", item: "Butter", quantity: 10, amount: 12000 },
    { date: "Feb 25, 2025", item: "Noodles", quantity: 20, amount: 10000 },
  ]);

  const [selectedMonth, setSelectedMonth] = useState("All");
  const [newPurchase, setNewPurchase] = useState({
    date: "",
    item: "",
    quantity: "",
    amount: "",
  });

  // Function to handle new purchase form submission
  const handleAddPurchase = (e) => {
    e.preventDefault();
    const { date, item, quantity, amount } = newPurchase;

    if (date && item && quantity && amount) {
      const newPurchaseRecord = {
        date,
        item,
        quantity: Number(quantity),
        amount: Number(amount),
      };
      setPurchaseData((prevData) => [...prevData, newPurchaseRecord]);
      setNewPurchase({ date: "", item: "", quantity: "", amount: "" });
    }
  };

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPurchase((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to filter purchases by month
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

  // Ensure purchaseData is an array
  const safePurchaseData = Array.isArray(purchaseData) ? purchaseData : [];
  const filteredPurchases = filterByMonth(safePurchaseData, selectedMonthIndex);

  // Calculate total purchase amount (2/3 of the sales)
  const totalPurchaseAmount = filteredPurchases.reduce((total, purchase) => total + (purchase.amount * 2) / 3, 0);

  return (
    <div className="history-container">
      <h2>Add Purchase Record</h2>

      {/* Form to Add New Purchase Record */}
      <form className="add-purchase-form" onSubmit={handleAddPurchase}>
        <div className="form-field">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newPurchase.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Item:</label>
          <input
            type="text"
            name="item"
            value={newPurchase.item}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={newPurchase.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Amount (₦):</label>
          <input
            type="number"
            name="amount"
            value={newPurchase.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Purchase</button>
      </form>

      {/* Month Selection Buttons */}
      <h2>Purchase History</h2>
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
        <h3>Purchases for {selectedMonth === "All" ? "All Months" : selectedMonth}</h3>
      </div>

      {/* Show Purchases Only If Data Exists */}
      {filteredPurchases.length > 0 ? (
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

          {/* Display the Total Purchase Amount at the End of the Table */}
          <div className="total-row">
            <strong>Total Purchase: ₦{totalPurchaseAmount.toLocaleString()}</strong>
          </div>
        </>
      ) : (
        <p className="no-data">No purchase records available for {selectedMonth}.</p>
      )}
    </div>
  );
};

export default PurchaseHistory;