import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  registerables,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { chart } from "@/interfaces/type";

ChartJS.register(ArcElement, ...registerables, CategoryScale, Tooltip, Legend);

const LineChart: React.FC<{ props: chart }> = ({ props }) => {
  const data = {
    labels: props?.labels,
    datasets: [
      {
        label: props?.unit,
        data: props?.datas,
        fill: false,
        backgroundColor: "rgb(100, 200, 100)",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="w-full bg-white rounded-2xl h-full p-6 flex justify-between flex-col items-center">
      <h2 className="text-xl text-gray-800 font-bold leading-tight">
        {props?.tittle}
      </h2>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Line data={data} />
      </div>
    </div>
  );
};

export default LineChart;
