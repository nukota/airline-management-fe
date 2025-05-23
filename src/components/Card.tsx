import React from "react";
import { FlightType } from "@/interfaces/type";
import { toast } from "react-toastify";
import useFetch from "@/hooks/useFetch";
import { showErrorToast } from "@/utils/toastUtils";

const Card: React.FC<{ flight: FlightType }> = ({ flight }) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER}/booking/check-booking?flightId=${flight.flightId}`;
  const { data, loading, error } = useFetch<any>(url);

  const handleChooseFlight = async () => {
    if (data)
      window.location.href = `/DetailPage?flightId=${flight.flightId}&
      logo=${flight.logo}&brand=${flight.airlines}&date=${flight.departureTime}&time=""&departure=${flight.departureAirport.city}&destination=${flight.arrivalAirport.city}&airportStart=${flight.departureAirport.airportName}&airportEnd=${flight.arrivalAirport.airportName}&price=${flight.price}&duration=${flight.flightDuration}`;

    if (error) showErrorToast(error);
  };

  return (
    <div
      key={flight.flightId}
      className="rounded-3xl flex flex-col  justify-around min-h-[250px] bg-white hover:drop-shadow-lg p-5"
    >
      <div className="flex items-center">
        <picture>
          <img
            src={flight.logo}
            alt={flight.airlines}
            className=" h-8 object-cover mr-4"
          />
        </picture>

        <div className="flex  w-full  justify-between">
          <h2 className="text-xl  font-medium">{flight.airlines}</h2>
          <h2 className="text-2xl  font-semibold">{flight.flightId}</h2>
        </div>
      </div>
      <div className="flex justify-end -mt-4">
        <p className="text-sm text-gray-600">{flight.departureTime}</p>
      </div>

      <div className="grid grid-cols-3 grid-cen items-center ">
        <a className="text-blue-500 font-medium text-lg flex justify-center">
          {flight.departureAirport.city}
        </a>
        <div className="flex flex-col items-center">
          <div>{flight.flightDuration}h </div>
          <svg
            className="w-20 h-2"
            viewBox="0 0 100 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="4" x2="90" y2="4" stroke="black" />
            <circle cx="5" cy="4" r="4" fill="#D9D9D9" stroke="black" />
            {!flight.intermediateAirports ? (
              <></>
            ) : flight.intermediateAirports.length === 0 ? (
              <></>
            ) : flight.intermediateAirports.length > 1 ? (
              <>
                <circle cx="30" cy="4" r="4" fill="#D9D9D9" stroke="black" />
                <circle cx="60" cy="4" r="4" fill="#D9D9D9" stroke="black" />
              </>
            ) : (
              <circle cx="45" cy="4" r="4" fill="#D9D9D9" stroke="black" />
            )}

            <circle cx="90" cy="4" r="4" fill="#D9D9D9" stroke="black" />
          </svg>
        </div>
        <a className="text-blue-500 font-medium text-lg flex justify-center">
          {flight.arrivalAirport.city}
        </a>
      </div>

      <div className="-mb-3 ">
        {flight.seatsAvailable > 0 ? (
          <div className="font-medium text-green-400">Seat Available</div>
        ) : (
          <div className="font-medium text-rose-400">Sold Out</div>
        )}
      </div>

      <div className="flex justify-between items-center ">
        <div className="text-2xl  font-semibold">
          {flight.price} <span className="text-base"> VND</span>
        </div>
        <button
          onClick={handleChooseFlight}
          className="w-20 h-8 p-3 font-semibold bg-opacity-80 hover:bg-opacity-100 active:btn-active flex items-center justify-center bg-primary rounded-xl text-white"
        >
          Chọn
        </button>
      </div>
    </div>
  );
};

export default Card;
