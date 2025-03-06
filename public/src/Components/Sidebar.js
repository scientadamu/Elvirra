import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h2>EFT</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/set-budget">Set Budget</Link></li>
        <li><Link to="/track-expenses">Track Expenses</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/purchase-history">Purchase History</Link></li>
        <li><Link to="/sales-history">Sales History</Link></li>
      </ul>
      <button className="logout-btn">Logout</button>
    </nav>
  );
};

export default Sidebar;
