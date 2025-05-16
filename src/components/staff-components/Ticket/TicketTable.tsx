"use client";
import React, { useState } from "react";
import { TicketType } from "@/interfaces/type";

import PaginationControl from "../../PaginationControl ";
import TicketRow from "./TicketRow";
const MAX_LENGTH_COL = 9;

const TicketTable: React.FC<{ tickets: TicketType[] }> = ({ tickets }) => {
  const [page, setPage] = useState<number>(1);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>TicketId</th>
              <th>BookingId</th>
              <th>Passenger</th>
              <th>FlightId</th>
              <th>Seat</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => {
              if (
                index >= MAX_LENGTH_COL * (page - 1) &&
                index < MAX_LENGTH_COL * page
              ) {
                return (
                  <TicketRow
                    key={ticket.ticketId}
                    ticket={ticket}
                    index={index}
                  />
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>

      <PaginationControl
        totalItems={tickets.length}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
};

export default TicketTable;
