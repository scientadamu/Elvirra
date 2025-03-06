import React from "react";

const TrackExpenses = () => {
  return (
    <div className="track-expenses">
      <h2>Track Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>March 3</td>
            <td>Groceries</td>
            <td>$50</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrackExpenses;
