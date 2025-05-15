"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface TicketCardProps {
  bookingId: string;
  flightId: string;
  bookedAt: string;
  paymentStatus: boolean;
  seatId: string;
  seatClass: string;
  price: string;
}
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { bookingEndpoint } from "@/services/axios/endpoints/booking.endpoint";
import { apiRequest } from "@/utils/apiRequest";
const TicketCard: React.FC<TicketCardProps> = ({
  bookingId,
  flightId,
  bookedAt,
  paymentStatus,
  seatId,
  seatClass,
  price,
}) => {
  const { data: session } = useSession();

  const [flightInfo, setFlightInfo] = useState<{
    departureTime: string;
    airlines: string;
    departureAirport: {
      airportName: string;
      city: string;
    };
    arrivalAirport: {
      airportName: string;
      city: string;
    };
  }>({
    departureTime: "",
    airlines: "",
    departureAirport: {
      airportName: "",
      city: "",
    },
    arrivalAirport: {
      airportName: "",
      city: "",
    },
  });

  useEffect(() => {
    const getFlightInfo = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/flight/${flightId}`,
        headers: {
          Authorization: session?.user.token,
        },
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data;
        setFlightInfo({
          departureTime: responseData.departureTime,
          airlines: responseData.airlines,
          departureAirport: {
            airportName: responseData.departureAirport.airportName,
            city: responseData.departureAirport.city,
          },
          arrivalAirport: {
            airportName: responseData.arrivalAirport.airportName,
            city: responseData.arrivalAirport.city,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };
    getFlightInfo();
  }, [flightId, session]);

  const cancelBooking = async (id: any) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER}${bookingEndpoint[
      "put-cancel-booking"
    ](id)}`;
    const { result, error } = await apiRequest(
      url,
      "DELETE",
      session?.user.token
    );
    if (error) showErrorToast(error);
    else showSuccessToast("Cancel succesful");
  };
  return (
    <div className="bg-white shadow rounded-lg p-4 drop-shadow-md m-2 min-w-[500px] max-w-[700px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <div
                className="bg-cover h-8 w-8"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/PxvbyDxx/image-362-2.png')",
                }}
              ></div>
            </div>
            <span className="font-semibold ml-2 text-xl">
              {flightInfo?.airlines},{" "}
            </span>
          </div>
          <span className="font-light text-sm">{flightInfo.departureTime}</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className="font-semibold text-xl">{seatId}</div>
          <div className=" text-sm text-gray-500">Class {seatClass}</div>
        </div>
      </div>
      <div>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <div className="text-gray-900 font-semibold text-xl">
              {flightInfo.departureAirport.airportName} -{" "}
              {flightInfo.arrivalAirport.airportName}
            </div>
            <div className="text-sm text-gray-500">
              {flightInfo.departureAirport.city} -{" "}
              {flightInfo.arrivalAirport.city}
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="text-lg text-gray-900 font-semibold">
              {price} VND
            </div>
            <div className="flex w-full justify-end">
              {paymentStatus ? (
                <div className="text-sm  text-green-500">Paid</div>
              ) : (
                <div className="text-sm  text-red-400">Unpaid</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm  text-gray-500">Bookat: {bookedAt}</div>
          <Dropdown key={bookingId} className="flex justify-center">
            <DropdownTrigger>
              <Button variant="bordered">
                <svg
                  className="w-4 h-4 hover:opacity-50 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 50"
                  fill="none"
                >
                  <circle cx="25" cy="25" r="25" fill="#2F2F2F" />
                  <circle cx="100" cy="25" r="25" fill="#2F2F2F" />
                  <circle cx="175" cy="25" r="25" fill="#2F2F2F" />
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              key={bookingId}
              aria-label="Static Actions"
              className="bg-white rounded-xl drop-shadow-lg"
            >
              <DropdownItem
                textValue="dropdown"
                key={`delete-${bookingId}`}
                className="btn  btn-sm btn-ghost text-red-600"
                onClick={() => cancelBooking(bookingId)}
              >
                <div className="flex justify-between">
                  <p>Cancel booking</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#f24a4a"
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    />
                  </svg>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
