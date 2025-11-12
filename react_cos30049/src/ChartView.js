import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function ChartView({ result }) {
  const isSpam = result?.prediction === "Spam";
  const confidence = result?.confidence ?? 0;

  const data = {
    labels: ["Spam", "Not Spam"],
    datasets: [
      {
        label: "Prediction Probability",
        data: isSpam ? [confidence, 1 - confidence] : [1 - confidence, confidence],
        backgroundColor: ["rgba(255,99,132,0.6)", "rgba(75,192,192,0.6)"],
      },
    ],
  };


  return (
    <div className="mt-8 max-w-md mx-auto bg-white p-4 rounded-xl shadow">
      <Bar data={data} />
    </div>
  );
}