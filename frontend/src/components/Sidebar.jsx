import {
  BarChart3,
  Users,
  ClipboardList,
  LogOut,
  LayoutDashboard,
  Database,
} from "lucide-react";

const Sidebar = ({
  activeSection,
  setActiveSection,
  onLogout,
  totalSurveys,
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
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>📊 ResponseIQ</h2>
        <p>Survey Analytics Platform</p>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-nav-label">Navigation</p>
        {navItems.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            className={`sidebar-btn ${activeSection === id ? "active" : ""}`}
            onClick={() => setActiveSection(id)}
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
  );
};

export default Sidebar;
