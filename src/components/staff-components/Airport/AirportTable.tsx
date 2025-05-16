import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useAirports } from "@/provider/AirportProvider";
import PaginationControl from "@/components/PaginationControl ";
import { AirportRowProvider } from "@/provider/AirportRowProvider";
import AirportRow from "./AirportRow";

const MAX_LENGTH_COL = 9;

const AirportTable = () => {
  const airports = useAirports();
  const [page, setPage] = useState<number>(1);

  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Airport Code</th>
              <th>Airport Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Description</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {airports.map((cardData, index) => {
              if (
                index >= MAX_LENGTH_COL * (page - 1) &&
                index < MAX_LENGTH_COL * page
              ) {
                return (
                  <AirportRowProvider
                    key={cardData.airportId}
                    airport={cardData}
                  >
                    <AirportRow index={index} />
                  </AirportRowProvider>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>

      <PaginationControl
        totalItems={airports.length}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AirportTable;
