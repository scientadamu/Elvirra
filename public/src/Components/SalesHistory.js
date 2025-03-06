import React, { useState } from "react";
import "./History.css";

const SalesHistory = () => {
  // Generate 10-15 sales per day for 4 weeks
  const salesData = [
    { date: "Feb 5, 2025", item: "Bread", quantity: 10, amount: 10000 },
    { date: "Feb 5, 2025", item: "Milk", quantity: 8, amount: 12000 },
    { date: "Feb 5, 2025", item: "Eggs", quantity: 30, amount: 18000 },
    { date: "Feb 5, 2025", item: "Soft Drinks", quantity: 50, amount: 50000 },
    { date: "Feb 5, 2025", item: "Sugar", quantity: 5, amount: 5000 },
    { date: "Feb 5, 2025", item: "Rice", quantity: 10, amount: 40000 },
    { date: "Feb 5, 2025", item: "Cooking Oil", quantity: 15, amount: 30000 },
    { date: "Feb 5, 2025", item: "Biscuits", quantity: 25, amount: 12500 },
    { date: "Feb 5, 2025", item: "Butter", quantity: 12, amount: 14400 },
    { date: "Feb 5, 2025", item: "Detergent", quantity: 20, amount: 10000 },
    { date: "Feb 5, 2025", item: "Salt", quantity: 40, amount: 4000 },
    { date: "Feb 5, 2025", item: "Noodles", quantity: 30, amount: 15000 },
    { date: "Feb 5, 2025", item: "Tomato Paste", quantity: 18, amount: 10800 },
    { date: "Feb 5, 2025", item: "Margarine", quantity: 15, amount: 9000 },
    { date: "Feb 5, 2025", item: "Cereal", quantity: 8, amount: 16000 },

    { date: "Feb 6, 2025", item: "Bread", quantity: 12, amount: 12000 },
    { date: "Feb 6, 2025", item: "Milk", quantity: 10, amount: 15000 },
    { date: "Feb 6, 2025", item: "Eggs", quantity: 35, amount: 21000 },
    { date: "Feb 6, 2025", item: "Soft Drinks", quantity: 60, amount: 60000 },
    { date: "Feb 6, 2025", item: "Rice", quantity: 12, amount: 48000 },
    { date: "Feb 6, 2025", item: "Butter", quantity: 14, amount: 16800 },
    { date: "Feb 6, 2025", item: "Detergent", quantity: 25, amount: 12500 },
    { date: "Feb 6, 2025", item: "Salt", quantity: 50, amount: 5000 },
    { date: "Feb 6, 2025", item: "Noodles", quantity: 40, amount: 20000 },
    { date: "Feb 6, 2025", item: "Tomato Paste", quantity: 20, amount: 12000 },

    // Repeat for 4 weeks, randomizing item sales per day
  ];

  return (
    <div className="history-container">
      <h2>Sales History</h2>
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
          {salesData.map((sale, index) => (
            <tr key={index}>
              <td>{sale.date}</td>
              <td>{sale.item}</td>
              <td>{sale.quantity}</td>
              <td>₦{sale.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistory;
