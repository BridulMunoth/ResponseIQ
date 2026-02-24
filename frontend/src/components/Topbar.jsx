import { Sun, Moon, RefreshCw, Download, Menu } from "lucide-react";

const Topbar = ({
  title,
  subtitle,
  darkMode,
  onToggleDark,
  onRefresh,
  onExport,
  refreshing,
  onMenuToggle,
}) => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        {/* Hamburger button — visible only on mobile */}
        <button
          className="topbar-hamburger"
          onClick={onMenuToggle}
          title="Toggle menu"
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="unselectable">{title}</h1>
          {subtitle && <p className="unselectable">{subtitle}</p>}
        </div>
      </div>
      <div className="topbar-right">
        {onExport && (
          <button className="btn btn-secondary btn-sm" onClick={onExport}>
            <Download size={15} />
            <span className="topbar-btn-label">Export CSV</span>
          </button>
        )}
        {onRefresh && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={onRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              size={15}
              style={{
                animation: refreshing ? "spin 0.8s linear infinite" : "none",
              }}
            />
            <span className="topbar-btn-label">Refresh</span>
          </button>
        )}
        <button
          className="dark-toggle"
          onClick={onToggleDark}
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {/* Admin badge with logo */}
        <div className="admin-badge">
          <img
            src="/adminLogo.jpg"
            alt="Admin"
            className="admin-badge-logo"
            draggable="false"
          />
          <span className="unselectable">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
