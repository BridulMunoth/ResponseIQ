import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

const OrderMethodChart = ({ data }) => {
  if (!data?.labels?.length)
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  return (
    <div className="chart-container">
      <Pie
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: COLORS,
              borderWidth: 2,
              borderColor: "#fff",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { padding: 16, font: { size: 12 } },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.label}: ${ctx.parsed} responses`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default OrderMethodChart;
