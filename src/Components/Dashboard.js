import React from "react";

const Dashboard = () => {
  return (
    <div className="content">
      <h1>Welcome, Admin</h1>
      <div className="overview">
        <div className="card">Total Budget: $5000</div>
        <div className="card">Expenses: $1500</div>
        <div className="card">Remaining: $3500</div>
      </div>
    </div>
  );
};

export default Dashboard;
