"use client";
import React, { useState } from "react";
import PaginationControl from "../../PaginationControl ";
import { FlightRowProvider } from "@/provider/FlightRowProvider";
import { useFlight } from "@/provider/FlightProvider";
import FlightRow from "./FlightRow";

const MAX_LENGTH_COL = 9;

const FlightTable = () => {
  const flights = useFlight();

  const [page, setPage] = useState<number>(1);

  return (
    <div className=" bg-white rounded-2xl p-5 my-3">
      <div>
        <div className="overflow-x-auto ">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Flight</th>
                <th>Departure</th>
                <th></th>
                <th>Destination</th>
                <th>Date</th>
                <th>Seat</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {flights.map((cardData, index) => {
                if (
                  index >= MAX_LENGTH_COL * (page - 1) &&
                  index < MAX_LENGTH_COL * page
                ) {
                  return (
                    <FlightRowProvider
                      key={cardData.flightId}
                      flight={cardData}
                    >
                      <FlightRow
                        key={cardData.flightId}
                        flight={cardData}
                        index={index}
                      />
                    </FlightRowProvider>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
        <PaginationControl
          totalItems={flights.length}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default FlightTable;
