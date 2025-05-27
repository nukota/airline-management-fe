import React, { useState, useMemo } from "react";
import { FlightType } from "@/interfaces/type";

const MAX_LENGTH_COL = 9;
const MAX_PAGE_BUTTONS = 3;

const formatDateTime = (dateTimeStr: string) => {
  const dateObj = new Date(dateTimeStr);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  return (
    <>
      {`${day}-${month}-${year}`}
      <br />
      {`${hours}:${minutes}`}
    </>
  );
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
};

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
        {currentFlights?.map((flight) => (
          <div
            key={flight.id}
            className="bg-white rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 w-full mb-4">
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  className="w-full h-full object-contain"
                  src={flight.airline.logo}
                  alt="Logo"
                />
              </div>
              <div>
                <div className="font-bold text-lg">{flight.flightCode}</div>
                <div className="text-sm opacity-50">{flight.airline.name}</div>
              </div>
            </div>
            <div className="flex w-full justify-between items-center mb-4">
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold">
                  {flight.departureAirport.cityName}
                </span>
                <span className="text-sm">
                  {flight.departureAirport.airportName}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDateTime(flight.departureDate)}
                </span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-6"></div>
              <div className="flex flex-col items-end text-right">
                <span className="font-semibold">
                  {flight.arrivalAirport.cityName}
                </span>
                <span className="text-sm">
                  {flight.arrivalAirport.airportName}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDateTime(flight.arrivalDate)}
                </span>
              </div>
            </div>
            <div className="flex w-full justify-between items-center mb-2">
              <span className="font-semibold">
                {formatDuration(flight.totalDuration)}
              </span>
              <span className="font-semibold">{flight.basePrice} VND</span>
            </div>
            <button
              className="w-full h-10 mt-2 font-semibold bg-indigo-500 rounded-xl text-white hover:bg-indigo-600 transition"
              onClick={() => {
                window.location.href = `/DetailPage?flightId=${flight.id}&logo=${flight.airline.logo}&brand=${flight.airline.name}&date=${flight.departureDate}&time=${flight.arrivalDate}&departure=${flight.departureAirport.cityName}&destination=${flight.arrivalAirport.cityName}&airportStart=${flight.departureAirport.airportName}&airportEnd=${flight.arrivalAirport.airportName}&price=${flight.basePrice}&duration=${flight.totalDuration}`;
              }}
            >
              Chọn
            </button>
          </div>
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