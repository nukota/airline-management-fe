"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FlightType, IntermediateAirport } from "@/interfaces/type";
import axios from "axios";
import { toast } from "react-toastify";
import PaginationControl from "./PaginationControl ";
import { bookingEndpoint } from "@/services/axios/endpoints/booking.endpoint";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast } from "@/utils/toastUtils";
import { airportEndpoint } from "@/services/axios/endpoints/airport.endpoint";

const MAX_LENGTH_COL = 9;

const ListSearchingView: React.FC<{ allFlight: FlightType[] }> = ({
  allFlight,
}) => {
  const [page, setPage] = useState<number>(1);

  const statusColor = (status: any) => {
    switch (status) {
      case "Đã hủy chuyến":
        return `text-red-400`;
      case "Đang bay":
        return `text-green-400`;
      case "Chưa khởi hành":
        return `text-yellow-400`;
      default:
        return `text-blue-400`;
    }
  };

  const handleChooseFlight = async (flight: any) => {
    // const url = `${process.env.NEXT_PUBLIC_SERVER}${bookingEndpoint[
    //   "get-check-booking-avaiable"
    // ](flight.flightId)}`;

    // const { result, error } = await apiRequest(url, "GET");
    // if (error) showErrorToast(error);
    // else
      window.location.href = `/DetailPage?flightId=${flight.id}&logo=${flight.airline.logo}&brand=${flight.airline.name}&date=${flight.departureDate}&time=${flight.arrivalDate}&departure=${flight.departureAirport.cityName}&destination=${flight.arrivalAirport.cityName}&airportStart=${flight.departureAirport.airportName}&airportEnd=${flight.arrivalAirport.airportName}&price=${flight.basePrice}&duration=${flight.totalDuration}`;
  };

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

  return (
    <div data-testid="list">
      <div className="overflow-x-auto p-4">
        <div className="">
          {allFlight.map((flight, index) => {
            if (
              index >= MAX_LENGTH_COL * (page - 1) &&
              index < MAX_LENGTH_COL * page
            ) {
              return (
                <div
                  key={flight.id}
                  className="bg-white rounded-lg p-5 m-2 items-center"
                >
                  <div className="grid grid-cols-7 hover:drop-shadow-lg items-center">
                    <div className="col-span-1">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 flex items-center justify-center">
                          <img
                            className="w-full h-full object-contain"
                            src={flight.airline.logo}
                            alt="Logo"
                          />
                        </div>
                        <div>
                          <div className="font-bold">{flight.flightCode}</div>
                          <div className="text-sm opacity-50">
                            {flight.airline.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 flex justify-between px-20 items-center">
                      <div className="text-left flex flex-col items-start">
                        <span className="font-semibold">
                          {flight.departureAirport.cityName}
                        </span>
                        <span className="text-sm">
                          {flight.departureAirport.airportName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {
                            formatDateTime(flight.departureDate).props
                              .children[0]
                          }{" "}
                          {
                            formatDateTime(flight.departureDate).props
                              .children[2]
                          }
                        </span>
                      </div>
                      <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-8"></div>
                      <div className="text-left flex flex-col items-start">
                        <span className="font-semibold">
                          {flight.arrivalAirport.cityName}
                        </span>
                        <span className="text-sm">
                          {flight.arrivalAirport.airportName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDateTime(flight.arrivalDate).props.children[0]}{" "}
                          {formatDateTime(flight.arrivalDate).props.children[2]}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <span className="font-semibold">Thời lượng bay</span>
                      <p className="text-sm">
                        {`${Math.floor(flight.totalDuration / 60)
                          .toString()
                          .padStart(2, "0")}:${(flight.totalDuration % 60)
                          .toString()
                          .padStart(2, "0")} giờ`}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <span className="font-semibold ">
                        {flight.basePrice} VND
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleChooseFlight(flight)}
                        className="w-20 h-8 p-3 font-semibold bg-opacity-80 hover:bg-opacity-100 active:btn-active flex items-center justify-center 
                        bg-indigo-500 rounded-xl text-white"
                      >
                        Chọn
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <PaginationControl
        totalItems={allFlight.length}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
};

export default ListSearchingView;
