"use client";

import React, { useEffect, useState } from "react";
import AirportTable from "./AirportTable";
import axios from "axios";
import { AirportType } from "@/interfaces/type";
import CreateAirportForm from "./CreateAirportForm";
import FilterAirportBar from "./FilterAirportBar";

const AirportManage = () => {
  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-2xl font-semibold">
          Airport DashBoard
        </div>
        <div className="collapse-content"></div>
      </div>

      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" />
        <div className="collapse-title ">
          <div className="text-2xl font-semibold inline-flex items-center">
            Airport Table Management
          </div>
        </div>
        <div className="flex flex-col collapse-content">
          <div className="flex justify-between h-full items-center mt-5">
            <CreateAirportForm />
            <FilterAirportBar />
          </div>

          <div className=" bg-white rounded-2xl p-5 my-3">
            <AirportTable />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportManage;
