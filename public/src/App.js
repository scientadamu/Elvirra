import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import SetBudget from "./pages/SetBudget";
// import TrackExpenses from "./pages/TrackExpenses";
// import Reports from "./pages/Reports";
// import PurchaseHistory from "./pages/PurchaseHistory";
// import SalesHistory from "./pages/SalesHistory";
// import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  );
}

export default App;
