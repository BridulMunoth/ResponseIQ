const StatsCard = ({ label, value, sub, icon: Icon, colorClass, trend }) => {
  return (
    <div className="stats-card">
      <div className={`stats-icon ${colorClass}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="stats-label">{label}</p>
        <p className="stats-value">{value ?? "—"}</p>
        {sub && (
          <p className="stats-sub">
            {trend === "up" && <span className="stats-up">↑ </span>}
            {trend === "down" && <span className="stats-down">↓ </span>}
            {sub}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
