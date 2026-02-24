import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import {
  ClipboardList,
  Users,
  CheckCircle,
  TrendingUp,
  BarChart3,
  PieChart,
  Star,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import SurveyTable from "../components/SurveyTable";

import OrderMethodChart from "../components/Charts/OrderMethodChart";
import StockFrequencyChart from "../components/Charts/StockFrequencyChart";
import OperationalFactorChart from "../components/Charts/OperationalFactorChart";
import GenderDistributionChart from "../components/Charts/GenderDistributionChart";
import SatisfactionChart from "../components/Charts/SatisfactionChart";
import AverageRatingsChart from "../components/Charts/AverageRatingsChart";

import {
  getSurveys,
  getAnalyticsSummary,
  getOrderMethodAnalytics,
  getStockFrequencyAnalytics,
  getOperationalFactorAnalytics,
  getGenderDistributionAnalytics,
  getAverageRatings,
  getSatisfactionSummary,
} from "../services/api";

const AUTO_REFRESH_MS = 10000;

const Dashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );
  const [activeSection, setActiveSection] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [surveys, setSurveys] = useState([]);
  const [summary, setSummary] = useState(null);
  const [orderMethod, setOrderMethod] = useState(null);
  const [stockFrequency, setStockFrequency] = useState(null);
  const [operationalFactor, setOperationalFactor] = useState(null);
  const [genderDist, setGenderDist] = useState(null);
  const [avgRatings, setAvgRatings] = useState(null);
  const [satisfaction, setSatisfaction] = useState(null);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const fetchAll = useCallback(async (silent = false) => {
    if (!silent) setRefreshing(true);
    try {
      const [
        surveysRes,
        summaryRes,
        orderRes,
        stockRes,
        opRes,
        genderRes,
        ratingsRes,
        satisfactionRes,
      ] = await Promise.all([
        getSurveys(),
        getAnalyticsSummary(),
        getOrderMethodAnalytics(),
        getStockFrequencyAnalytics(),
        getOperationalFactorAnalytics(),
        getGenderDistributionAnalytics(),
        getAverageRatings(),
        getSatisfactionSummary(),
      ]);
      setSurveys(surveysRes.data.data);
      setSummary(summaryRes.data);
      setOrderMethod(orderRes.data);
      setStockFrequency(stockRes.data);
      setOperationalFactor(opRes.data);
      setGenderDist(genderRes.data);
      setAvgRatings(ratingsRes.data);
      setSatisfaction(satisfactionRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(() => fetchAll(true), AUTO_REFRESH_MS);
    return () => clearInterval(interval);
  }, [fetchAll]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const handleSurveyDeleted = (id) => {
    setSurveys((prev) => prev.filter((s) => s._id !== id));
    setSummary((prev) =>
      prev ? { ...prev, totalResponses: prev.totalResponses - 1 } : prev,
    );
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(surveys);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `responseiq-surveys-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const topbarTitles = {
    overview: {
      title: "Overview",
      subtitle: "Key metrics and stats at a glance",
    },
    charts: {
      title: "Analytics Charts",
      subtitle: "Visual breakdown of survey responses",
    },
    responses: {
      title: "Survey Responses",
      subtitle: "All submissions — searchable & filterable",
    },
  };

  return (
    <div className="app-layout">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
        totalSurveys={surveys.length}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="main-content">
        <Topbar
          title={topbarTitles[activeSection].title}
          subtitle={topbarTitles[activeSection].subtitle}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((d) => !d)}
          onRefresh={() => fetchAll()}
          onExport={activeSection === "responses" ? handleExportCSV : undefined}
          refreshing={refreshing}
          onMenuToggle={() => setSidebarOpen((o) => !o)}
        />

        <div className="page-body">
          {/* ===== OVERVIEW ===== */}
          {activeSection === "overview" && (
            <>
              <div className="section-header">
                <div>
                  <h2 className="section-title">Dashboard Overview</h2>
                  <p className="section-sub">Auto-refreshes every 10 seconds</p>
                </div>
              </div>

              <div className="stats-grid">
                <StatsCard
                  label="Total Responses"
                  value={summary?.totalResponses ?? "—"}
                  sub="All-time submissions"
                  icon={ClipboardList}
                  colorClass="blue"
                />
                <StatsCard
                  label="Highly Satisfied"
                  value={summary?.highlySatisfied ?? "—"}
                  sub={`${summary?.satisfactionRate ?? 0}% satisfaction rate`}
                  icon={CheckCircle}
                  colorClass="green"
                  trend="up"
                />
                <StatsCard
                  label="This Month"
                  value={summary?.recentMonth ?? "—"}
                  sub="Responses in last 30 days"
                  icon={TrendingUp}
                  colorClass="orange"
                />
                <StatsCard
                  label="Average Rating"
                  value={
                    avgRatings
                      ? `${((avgRatings.productFreshnessRating + avgRatings.professionalismRating + avgRatings.packagingQualityRating) / 3).toFixed(1)}/5`
                      : "—"
                  }
                  sub="Across all rating categories"
                  icon={Star}
                  colorClass="purple"
                />
              </div>

              {/* Quick charts preview */}
              <div className="charts-grid">
                <div className="card">
                  <div className="card-header">
                    <div>
                      <p className="card-title">Order Method</p>
                      <p className="card-subtitle">
                        How retailers prefer to order
                      </p>
                    </div>
                    <PieChart size={18} color="var(--text-muted)" />
                  </div>
                  <OrderMethodChart data={orderMethod} />
                </div>
                <div className="card">
                  <div className="card-header">
                    <div>
                      <p className="card-title">Overall Satisfaction</p>
                      <p className="card-subtitle">
                        Retailer satisfaction breakdown
                      </p>
                    </div>
                    <PieChart size={18} color="var(--text-muted)" />
                  </div>
                  <SatisfactionChart data={satisfaction} />
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div>
                    <p className="card-title">Average Ratings</p>
                    <p className="card-subtitle">
                      Product freshness · Professionalism · Packaging
                    </p>
                  </div>
                  <Star size={18} color="var(--text-muted)" />
                </div>
                <AverageRatingsChart data={avgRatings} />
              </div>
            </>
          )}

          {/* ===== CHARTS ===== */}
          {activeSection === "charts" && (
            <>
              <div className="section-header">
                <div>
                  <h2 className="section-title">Analytics Charts</h2>
                  <p className="section-sub">
                    Full breakdown of all survey dimensions
                  </p>
                </div>
              </div>

              <div className="charts-grid">
                <div className="card">
                  <div className="card-header">
                    <div>
                      <p className="card-title">Order Method</p>
                      <p className="card-subtitle">
                        How retailers prefer to order
                      </p>
                    </div>
                  </div>
                  <OrderMethodChart data={orderMethod} />
                </div>
                <div className="card">
                  <div className="card-header">
                    <div>
                      <p className="card-title">Stock Frequency</p>
                      <p className="card-subtitle">
                        How often retailers restock
                      </p>
                    </div>
                  </div>
                  <StockFrequencyChart data={stockFrequency} />
                </div>
                <div className="card">
                  <div className="card-header">
                    <div>
                      <p className="card-title">Operational Factor</p>
                      <p className="card-subtitle">
                        Key priority for retailers
                      </p>
                    </div>
                  </div>
                  <OperationalFactorChart data={operationalFactor} />
                </div>
                <div className="card">
                  <div className="card-header">
                    <div>
                      <p className="card-title">Gender Distribution</p>
                      <p className="card-subtitle">Respondent demographics</p>
                    </div>
                  </div>
                  <GenderDistributionChart data={genderDist} />
                </div>
                <div className="card">
                  <div className="card-header">
                    <div>
                      <p className="card-title">Overall Satisfaction</p>
                      <p className="card-subtitle">
                        Retailer satisfaction levels
                      </p>
                    </div>
                  </div>
                  <SatisfactionChart data={satisfaction} />
                </div>
                <div className="card">
                  <div className="card-header">
                    <div>
                      <p className="card-title">Average Ratings</p>
                      <p className="card-subtitle">1–5 scale ratings summary</p>
                    </div>
                    <BarChart3 size={18} color="var(--text-muted)" />
                  </div>
                  <AverageRatingsChart data={avgRatings} />
                </div>
              </div>
            </>
          )}

          {/* ===== RESPONSES ===== */}
          {activeSection === "responses" && (
            <>
              <div className="section-header">
                <div>
                  <h2 className="section-title">Survey Responses</h2>
                  <p className="section-sub">
                    {surveys.length} total submissions
                  </p>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleExportCSV}
                >
                  ⬇ Export CSV
                </button>
              </div>
              <div className="card">
                {surveys.length === 0 ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <SurveyTable
                    surveys={surveys}
                    onDeleted={handleSurveyDeleted}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
