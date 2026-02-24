import { Sun, Moon, RefreshCw, Download } from "lucide-react";

const Topbar = ({
  title,
  subtitle,
  darkMode,
  onToggleDark,
  onRefresh,
  onExport,
  refreshing,
}) => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="topbar-right">
        {onExport && (
          <button className="btn btn-secondary btn-sm" onClick={onExport}>
            <Download size={15} />
            Export CSV
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
            Refresh
          </button>
        )}
        <button
          className="dark-toggle"
          onClick={onToggleDark}
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="admin-badge">👤 Admin</div>
      </div>
    </div>
  );
};

export default Topbar;
