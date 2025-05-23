import { chart } from "@/interfaces/type";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const color = [
  "rgb(164, 206, 149)",
  "rgb(81, 130, 155)",
  "rgb(246, 153, 92)",
  "rgb(200, 100, 92)",
  "rgb(150, 100, 10)",
  "rgb(150, 20, 220)",
  "rgb(170, 110, 110)",
  "rgb(10, 200, 100)",
];
const PieChart: React.FC<{ props: chart }> = ({ props }) => {
  const data = {
    labels: props?.labels,
    datasets: [
      {
        label: props?.unit,
        data: props?.datas,
        backgroundColor: color.slice(0, props.datas.length),
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="w-full bg-white rounded-2xl h-full p-6 flex justify-between flex-col items-center">
      <h2 className="text-xl text-gray-800 font-bold leading-tight">
        {props?.tittle}
      </h2>
      <div className="h-full min-h-56 max-h-64 w-full flex flex-col justify-center items-center">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChart;
