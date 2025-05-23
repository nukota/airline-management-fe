import Card from "@/components/Card";
import { FlightType } from "@/interfaces/type";
import React, { useState, useMemo } from "react";

const MAX_LENGTH_COL = 9;
const MAX_PAGE_BUTTONS = 3;

const GridSearchingView: React.FC<{ allFlight: FlightType[] }> = ({
  allFlight,
}) => {
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(allFlight?.length / MAX_LENGTH_COL);

  const currentFlights = useMemo(() => {
    const start = MAX_LENGTH_COL * (page - 1);
    const end = start + MAX_LENGTH_COL;
    return allFlight?.slice(start, end);
  }, [page, allFlight]);

  const startPage = Math.max(
    1,
    Math.min(
      page - Math.floor(MAX_PAGE_BUTTONS / 2),
      totalPages - MAX_PAGE_BUTTONS + 1
    )
  );
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

  return (
    <div data-testid="grid">
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {currentFlights?.map((flight, index) => (
          <Card key={flight.flightId} flight={flight} />
        ))}
      </div>
      <div className="flex justify-between p-3 mt-5">
        <p className="font-medium">Total flights: {allFlight?.length}</p>
        <div className="join">
          <button
            className="join-item btn btn-xs btn-ghost"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            «
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            return (
              <button
                key={pageNumber}
                className={`join-item btn btn-xs ${
                  pageNumber === page ? "btn-active" : ""
                }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            className="join-item btn btn-xs btn-ghost"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridSearchingView;
