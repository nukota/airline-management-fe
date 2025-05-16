"use client";

import React from "react";
import { TicketType } from "@/interfaces/type";
import TicketTable from "./TicketTable";
import { useTickets } from "@/provider/TicketsProvider";
import FilterTicketsBar from "./FilterTicketsBar";

const TicketManage = () => {
  const data: TicketType[] = useTickets();

  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <div></div>
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-2xl font-semibold">
          Ticket DashBoard
        </div>
        <div className="collapse-content">
          <div className="flex gap-5 h-full"></div>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" />
        <div className="collapse-title ">
          <div className="text-2xl font-semibold inline-flex items-center">
            Ticket Table Management
          </div>
        </div>
        <div className="flex flex-col collapse-content">
          <FilterTicketsBar />
          <div className=" bg-white rounded-2xl p-5 my-3">
            <div className="overflow-x-auto">
              <TicketTable tickets={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketManage;
