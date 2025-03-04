import React, { useState } from "react";
import "./History.css";

const PurchaseHistory = () => {
  // Generate 3-5 purchases per week for 4 weeks
  const purchaseData = [
    { date: "Feb 5, 2025", item: "Rice (50kg)", category: "Groceries", amount: 25000 },
    { date: "Feb 8, 2025", item: "Cooking Oil (10L)", category: "Groceries", amount: 18000 },
    { date: "Feb 11, 2025", item: "Tomato Paste (Carton)", category: "Groceries", amount: 12000 },
    { date: "Feb 14, 2025", item: "Soft Drinks (Crate)", category: "Beverages", amount: 10000 },

    { date: "Feb 17, 2025", item: "Sugar (10kg)", category: "Groceries", amount: 5000 },
    { date: "Feb 20, 2025", item: "Noodles (Carton)", category: "Groceries", amount: 15000 },
    { date: "Feb 22, 2025", item: "Eggs (Crate)", category: "Groceries", amount: 6000 },

    { date: "Feb 26, 2025", item: "Detergent (Pack)", category: "Household", amount: 9000 },
    { date: "Feb 28, 2025", item: "Salt (Bag)", category: "Groceries", amount: 4000 },
    { date: "Mar 2, 2025", item: "Flour (Bag)", category: "Groceries", amount: 20000 },
    { date: "Mar 5, 2025", item: "Milk Powder (Carton)", category: "Dairy", amount: 25000 },

    { date: "Mar 10, 2025", item: "Spices (Pack)", category: "Groceries", amount: 8000 },
    { date: "Mar 15, 2025", item: "Margarine (Pack)", category: "Dairy", amount: 12000 },
  ];

  return (
    <div className="history-container">
      <h2>Purchase History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Item</th>
            <th>Category</th>
            <th>Amount (₦)</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.map((purchase, index) => (
            <tr key={index}>
              <td>{purchase.date}</td>
              <td>{purchase.item}</td>
              <td>{purchase.category}</td>
              <td>₦{purchase.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistory;
