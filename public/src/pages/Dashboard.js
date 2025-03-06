import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaMoneyBillWave, FaClipboardList, FaChartBar, FaShoppingCart, FaHistory, FaSignOutAlt, FaBars } from "react-icons/fa";
import DashboardContent from "../Components/DashboardContent";
import SetBudget from "../Components/SetBudget";
import TrackExpenses from "../Components/TrackExpenses";
import Reports from "../Components/Reports";
import PurchaseHistory from "../Components/PurchaseHistory";
import SalesHistory from "../Components/SalesHistory";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);
      setSidebarOpen(!mobileView);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMobile && sidebarOpen && !event.target.closest(".sidebar") && !event.target.closest(".toggle-sidebar")) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMobile, sidebarOpen]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/");
    }
  };

  const menuItems = [
    { section: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { section: "set-budget", label: "Set Budget", icon: <FaMoneyBillWave /> },
    { section: "track-expenses", label: "Track Expenses", icon: <FaClipboardList /> },
    { section: "reports", label: "Reports", icon: <FaChartBar /> },
    { section: "purchase-history", label: "Purchase History", icon: <FaShoppingCart /> },
    { section: "sales-history", label: "Sales History", icon: <FaHistory /> }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "set-budget":
        return <SetBudget />;
      case "track-expenses":
        return <TrackExpenses />;
      case "reports":
        return <Reports />;
      case "purchase-history":
        return <PurchaseHistory />;
      case "sales-history":
        return <SalesHistory />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h2>EFT</h2>
        <ul>
          {menuItems.map(({ section, label, icon }) => (
            <li key={section}>
              <a
                href="#"
                onClick={() => {
                  setActiveSection(section);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={activeSection === section ? "active" : ""}
              >
                {icon} <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="content">
        {/* Header */}
        <header>
          <div className="header-content">
            {isMobile && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="toggle-sidebar">
                <FaBars />
              </button>
            )}
            <span className="website-name">Elvira Finance Tracker</span>
          </div>
          <div className="header-right">
            <span className="welcomeNote">Welcome, Admin</span>
          </div>
        </header>

        {/* Dynamic Content Section */}
        <div id="content-area">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
