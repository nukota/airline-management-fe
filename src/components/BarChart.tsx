import { chart } from "@/interfaces/type";
import React, { useState } from "react";

interface BarChartProps {
  data: chart;
  orientation: "horizontal" | "vertical";
}

const BarChart: React.FC<BarChartProps> = ({ data, orientation }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);

  const showTooltip = (e: any) => {
    setTooltipContent(e.currentTarget.textContent || "");
    setTooltipX(e.currentTarget.offsetLeft - e.currentTarget.clientWidth);
    setTooltipY(e.currentTarget.clientHeight + e.currentTarget.clientWidth);
    setTooltipOpen(true);
  };

  const hideTooltip = () => {
    setTooltipContent("");
    setTooltipOpen(false);
    setTooltipX(0);
    setTooltipY(0);
  };
  return (
    <div className="flex flex-col justify-between w-full bg-white rounded-2xl h-full p-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl text-gray-800 font-bold leading-tight">
            {data?.tittle}
          </h2>
          <p className="mb-2 text-gray-600 text-sm">{data?.indicate}</p>
        </div>

        <div className="ml-12">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 mr-2 rounded-full"></div>
            <div className="text-sm text-gray-700">{data?.unit}</div>
          </div>
        </div>
      </div>
      {orientation === "vertical" ? (
        <div className="relative">
          {tooltipOpen && (
            <div
              className="absolute z-10 shadow-lg rounded-lg bg-white p-2"
              style={{ bottom: `${tooltipY}px`, left: `${tooltipX}px` }}
            >
              <div className="flex items-center justify-between text-sm">
                <div>{data.unit}:</div>
                <div className="font-bold ml-2">
                  <span>{tooltipContent}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex -mx-2 items-end mb-1">
            {data?.datas.map((dt, index) => (
              <div key={index} className="px-2 w-1/6">
                <div
                  style={{ height: `${dt * 1}px` }}
                  className="transition ease-in duration-200 bg-blue-600 hover:bg-blue-400 relative"
                  onMouseEnter={showTooltip}
                  onMouseLeave={hideTooltip}
                >
                  <div className="text-center absolute top-0 left-0 right-0 -mt-6 text-gray-800 text-sm">
                    {dt}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="border-t border-gray-400 mx-auto"
            style={{
              height: "1px",
              width: `${100 - (1 / data?.datas.length) * 100 + 3}%`,
            }}
          ></div>
          <div className="flex -mx-2 items-end">
            {data?.labels.map((label, index) => (
              <div key={index} className="px-2 w-1/6">
                <div className="bg-red-600 relative">
                  <div
                    className="text-center absolute top-0 left-0 right-0 h-2 -mt-px bg-gray-400 mx-auto"
                    style={{ width: "1px" }}
                  ></div>
                  <div className="text-center absolute top-0 left-0 right-0 mt-3 text-gray-700 text-sm">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-between">
            {data?.datas.map((dt, index) => (
              <div
                key={index}
                className="py-1 flex items-center justify-between"
              >
                {data?.labels[index]}

                <div className="gap-2 flex items-center">
                  <p className="text-black-700 text-sm"> {dt}</p>
                  <div
                    className={"bg-blue-600 hover:bg-blue-400 h-3"}
                    style={{ width: `${dt * 1}px` }}
                    onMouseEnter={showTooltip}
                    onMouseLeave={hideTooltip}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BarChart;
