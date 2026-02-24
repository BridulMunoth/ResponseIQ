import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  LogOut,
  CheckCircle,
  ArrowRight,
  X,
} from "lucide-react";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const customerName = localStorage.getItem("customerName") || "Customer";
  const [showHistoryMsg, setShowHistoryMsg] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerName");
    navigate("/");
  };

  return (
    <div className="customer-dashboard-page">
      {/* Header */}
      <header className="customer-dash-header">
        <div className="customer-dash-logo">
          <img
            src="/logo.png"
            alt="ResponseIQ"
            className="cust-dash-logo-img"
            draggable="false"
          />
        </div>
        <div className="customer-dash-right">
          <div className="cust-user-pill">
            <img
              src="/userLogo.png"
              alt="User"
              className="cust-pill-avatar"
              draggable="false"
            />
            <span className="cust-pill-name unselectable">{customerName}</span>
          </div>
          <button className="cust-logout-btn" onClick={handleLogout}>
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="customer-dash-main">
        <div className="customer-dash-welcome">
          <div className="cust-welcome-icon">
            <CheckCircle size={40} color="#00b853" />
          </div>
          <h1 className="unselectable">Welcome back, {customerName}! 👋</h1>
          <p className="unselectable">
            You are successfully logged in to the ResponseIQ Customer Portal.
          </p>
        </div>

        <div className="customer-dash-cards">
          {/* Take a Survey */}
          <div className="cust-card">
            <div className="cust-card-icon">
              <ClipboardList size={28} color="#2563eb" />
            </div>
            <h3 className="unselectable">Take a Survey</h3>
            <p className="unselectable">
              Share your feedback to help us improve.
            </p>
            <button
              className="cust-card-btn"
              onClick={() => navigate("/survey")}
            >
              Start Survey <ArrowRight size={16} />
            </button>
          </div>

          {/* My Responses */}
          <div className="cust-card">
            <div className="cust-card-icon cust-card-icon--green">
              <CheckCircle size={28} color="#10b981" />
            </div>
            <h3 className="unselectable">My Responses</h3>
            <p className="unselectable">View your past survey submissions.</p>
            <button
              className="cust-card-btn cust-card-btn--green"
              onClick={() => setShowHistoryMsg(true)}
            >
              View History <ArrowRight size={16} />
            </button>
            {showHistoryMsg && (
              <div className="cust-info-toast cust-info-toast--green">
                <span>No submissions yet. Take a survey first! 📋</span>
                <button
                  className="cust-toast-close"
                  onClick={() => setShowHistoryMsg(false)}
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
