import {
  BarChart3,
  Users,
  ClipboardList,
  LogOut,
  LayoutDashboard,
  Database,
  X,
} from "lucide-react";

const Sidebar = ({
  activeSection,
  setActiveSection,
  onLogout,
  totalSurveys,
  isOpen,
  onClose,
}) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "charts", label: "Analytics Charts", icon: BarChart3 },
    {
      id: "responses",
      label: "Survey Responses",
      icon: ClipboardList,
      badge: totalSurveys,
    },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "sidebar-mobile-open" : ""}`}>
        <div className="sidebar-logo">
          {/* Admin branding: logo + name */}
          <img
            src="/adminLogo.jpg"
            alt="Admin Logo"
            className="sidebar-admin-logo"
            draggable="false"
          />
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">Admin</span>
            <span className="sidebar-brand-sub">ResponseIQ</span>
          </div>
          {/* Close button on mobile */}
          <button
            className="sidebar-close-btn"
            onClick={onClose}
            title="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-nav-label">Navigation</p>
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              className={`sidebar-btn ${activeSection === id ? "active" : ""}`}
              onClick={() => {
                setActiveSection(id);
                onClose?.();
              }}
            >
              <Icon size={18} className="sidebar-icon" />
              {label}
              {badge !== undefined && (
                <span className="sidebar-badge">{badge}</span>
              )}
            </button>
          ))}

          <p className="sidebar-nav-label" style={{ marginTop: "16px" }}>
            System
          </p>
          <button
            className="sidebar-btn"
            onClick={() =>
              window.open("http://localhost:5000/api/survey", "_blank")
            }
          >
            <Database size={18} />
            API Explorer
          </button>
          <button className="sidebar-btn">
            <Users size={18} />
            Admin Profile
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
