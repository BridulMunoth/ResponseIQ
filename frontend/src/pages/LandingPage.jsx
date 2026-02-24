import { useNavigate } from "react-router-dom";
import { ShieldCheck, Users, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-container">
        <header className="landing-header">
          {/* Logo moved to main content */}
        </header>

        <main className="landing-main">
          <div className="landing-content">
            <div className="landing-logo-wrapper">
              <img
                src="/logo.png"
                alt="ResponseIQ Logo"
                className="landing-logo-img-main"
              />
            </div>
            <h1 className="landing-title unselectable">Welcome</h1>
            <p className="landing-subtitle unselectable">
              The complete Survey Analytics System. Please select your portal to
              continue.
            </p>

            <div className="portal-cards">
              <div className="portal-card" onClick={() => navigate("/login")}>
                <div className="portal-icon-wrapper admin-bg">
                  <ShieldCheck size={32} className="admin-color" />
                </div>
                <h2>Admin Portal</h2>
                <p>
                  Manage surveys, view analytics, and control system settings.
                </p>
                <button className="btn btn-outline-admin">
                  Admin Login <ArrowRight size={16} />
                </button>
              </div>

              <div
                className="portal-card"
                onClick={() => navigate("/customer-login")}
              >
                <div className="portal-icon-wrapper customer-bg">
                  <Users size={32} className="customer-color" />
                </div>
                <h2>Customer Portal</h2>
                <p>
                  Access your dashboard, submit surveys, and view your history.
                </p>
                <button className="btn btn-outline-customer">
                  Customer Login <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="landing-footer">
          <p>
            &copy; {new Date().getFullYear()} ResponseIQ. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
