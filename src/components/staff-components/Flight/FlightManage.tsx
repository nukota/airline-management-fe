"use client";

import React from "react";
import FlightTable from "./FlightTable";
import FlightReport from "./FlightReport";
import FilterFlightBar from "./FilterFlightBar";

const FlightManage = () => {
  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-2xl font-semibold">
          Flight DashBoard
        </div>
        <FlightReport />
      </div>

      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" />
        <div className="collapse-title ">
          <div className="text-2xl font-semibold inline-flex items-center">
            Flight Table Management
          </div>
        </div>
        <div className="flex flex-col collapse-content">
          <FilterFlightBar />
          <FlightTable />
        </div>
      </div>
    </div>
  );
};

export default FlightManage;
