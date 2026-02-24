import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const SatisfactionChart = ({ data }) => {
  if (!data?.labels?.length)
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  return (
    <div className="chart-container">
      <Doughnut
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: ["#10b981", "#2563eb", "#ef4444"],
              borderWidth: 3,
              borderColor: "#fff",
              hoverOffset: 6,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "60%",
          plugins: {
            legend: {
              position: "bottom",
              labels: { padding: 16, font: { size: 12 } },
            },
          },
        }}
      />
    </div>
  );
};

export default SatisfactionChart;
