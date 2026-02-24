import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const StockFrequencyChart = ({ data }) => {
  if (!data?.labels?.length)
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  return (
    <div className="chart-container">
      <Bar
        data={{
          labels: data.labels,
          datasets: [
            {
              label: "Responses",
              data: data.values,
              backgroundColor: ["#2563eb", "#10b981", "#f59e0b"],
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { precision: 0 },
              grid: { color: "rgba(0,0,0,0.05)" },
            },
            x: { grid: { display: false } },
          },
        }}
      />
    </div>
  );
};

export default StockFrequencyChart;
