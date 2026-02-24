import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderDistributionChart = ({ data }) => {
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
              backgroundColor: ["#2563eb", "#ec4899"],
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
              labels: { padding: 16, font: { size: 13 } },
            },
          },
        }}
      />
    </div>
  );
};

export default GenderDistributionChart;
