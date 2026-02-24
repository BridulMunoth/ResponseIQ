const AverageRatingsChart = ({ data }) => {
  if (!data)
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );

  const ratings = [
    { key: "productFreshnessRating", label: "Product Freshness" },
    { key: "professionalismRating", label: "Professionalism" },
    { key: "packagingQualityRating", label: "Packaging Quality" },
  ];

  return (
    <div className="ratings-grid">
      {ratings.map(({ key, label }) => {
        const val = data[key] ?? 0;
        const pct = (val / 5) * 100;
        return (
          <div key={key} className="rating-item">
            <div className="rating-value">
              {val}
              <span className="rating-max">/5</span>
            </div>
            <div className="rating-label">{label}</div>
            <div className="rating-bar">
              <div className="rating-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AverageRatingsChart;
