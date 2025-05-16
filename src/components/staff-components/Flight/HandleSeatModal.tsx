"use client";

import { useUpdateFlightSeatClass } from "@/hooks/flight-hooks/useUpdateFlightSeatClass";
import { useFlightRow, useSeatFlight } from "@/provider/FlightRowProvider";
import {
  DataFetchType,
  SeatFlightType,
  TicketClassType,
} from "@/interfaces/type";
import { apiRequest } from "@/utils/apiRequest";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback, useMemo } from "react";

interface ChosenSeat {
  seat: string;
  class: string;
  priceBonusInterest: string;
  price: string;
}

interface TicketClass {
  class: string;
  color: string;
}

const HandleSeatModal = () => {
  const { data: session } = useSession();

  const flight = useFlightRow();
  const seats = useSeatFlight();

  const [chooseSeats, setChooseSeats] = useState<ChosenSeat[]>([]);
  const [ticketColorClasses, setTicketColorClasses] = useState<TicketClass[]>(
    []
  );
  const [classToChange, setClassToChange] = useState<string>("");
  const [changeCollapse, setChangeCollapse] = useState<boolean>(false);

  const handleSeatSelection = useCallback(
    (seat: string, seatClass: string, priceBonusInterest: string) => {
      if (!chooseSeats.find((selectedSeat) => selectedSeat.seat === seat)) {
        const newSeat = {
          seat,
          class: seatClass,
          priceBonusInterest: priceBonusInterest,
          price: (
            parseFloat("125000") *
            (1 + parseFloat(priceBonusInterest))
          ).toString(),
        };
        setChooseSeats((prev) => [...prev, newSeat]);
      }
    },
    [chooseSeats]
  );

  const handleUnchecked = useCallback((seatId: string) => {
    return () => {
      setChooseSeats((prev) => prev.filter((seat) => seat.seat !== seatId));
    };
  }, []);

  const renderSeat = useCallback(
    (seat: SeatFlightType) => {
      let seatClassName =
        "grid seat text-sm font-light w-8 h-6 flex justify-center items-center rounded-lg m-2 cursor-pointer";
      let seatBgColor = "bg-gray-200";
      let textColor = "text-black";

      if (seat.isEmpty) {
        if (seat.class === "LV2") {
          seatBgColor = chooseSeats.find(
            (selectedSeat) => selectedSeat.seat === seat.seatId
          )
            ? "bg-blue-500"
            : "bg-seat-blue";
        } else {
          seatBgColor = chooseSeats.find(
            (selectedSeat) => selectedSeat.seat === seat.seatId
          )
            ? "bg-red-500"
            : "bg-red-200";
        }
        textColor = "text-white";
      } else {
        seatClassName += " bg-gray-500 text-white";
      }

      return (
        <div className="flex justify-between" key={seat.seatId}>
          <div className="indicator">
            {chooseSeats.find((choose) => seat.seatId === choose.seat) && (
              <span
                onClick={handleUnchecked(seat.seatId)}
                className="indicator-item mt-1 mr-1 cursor-pointer hover:bg-slate-500 badge bg-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 h-2"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <path
                    d="M9.68195 1.19689C10.2677 0.611104 11.2175 0.611104 11.8033 1.19689V1.19689C12.3891 1.78268 12.3891 2.73242 11.8033 3.31821L3.31799 11.8035C2.73221 12.3893 1.78246 12.3893 1.19667 11.8035V11.8035C0.610887 11.2177 0.610887 10.268 1.19667 9.68217L9.68195 1.19689Z"
                    fill="white"
                  />
                  <path
                    d="M11.8033 9.68202C12.3891 10.2678 12.3891 11.2175 11.8033 11.8033V11.8033C11.2175 12.3891 10.2678 12.3891 9.68197 11.8033L1.19669 3.31805C0.610905 2.73227 0.610905 1.78252 1.19669 1.19673V1.19673C1.78248 0.610947 2.73223 0.610947 3.31801 1.19673L11.8033 9.68202Z"
                    fill="white"
                  />
                </svg>
              </span>
            )}

            <div
              className={`${seatClassName} ${seatBgColor} ${textColor}`}
              onClick={() => {
                if (changeCollapse && seat.isEmpty) {
                  handleSeatSelection(
                    seat.seatId,
                    seat.class,
                    seat.ticketClass.priceBonusInterest
                  );
                }
              }}
            >
              {seat.seatId}
            </div>
          </div>
        </div>
      );
    },
    [changeCollapse, chooseSeats, handleSeatSelection, handleUnchecked]
  );

  const renderSeatGrid = useCallback(() => {
    const numRows = 6;

    return Array.from({ length: numRows }, (_, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="seat-row flex w-full justify-between items-center"
      >
        {Array.from(
          { length: Math.ceil(seats.length / numRows) },
          (_, seatIndex) => {
            const seatNumber = seatIndex + 1;
            const seatLabel = String.fromCharCode(65 + rowIndex) + seatNumber;
            const seat = seats.find((seat) => seat.seatId === seatLabel);
            if (!seat) {
              return null;
            }
            return renderSeat(seat);
          }
        )}
      </div>
    ));
  }, [seats, renderSeat]);

  const seatGrid = useMemo(() => renderSeatGrid(), [renderSeatGrid]);

  useEffect(() => {
    const getAllTicketClass = async () => {
      try {
        const { result, error } = await apiRequest<
          DataFetchType<TicketClassType>
        >(
          `${process.env.NEXT_PUBLIC_SERVER}/ticket-class/list`,
          "GET",
          session?.user.token
        );
        if (error) throw new Error(error);
        const newClass = result?.data.map((dt) => ({
          class: dt.className,
          color: dt.color,
        }));
        if (newClass) setTicketColorClasses(newClass);
      } catch (error) {
        console.error("Error fetching ticket classes:", error);
      }
    };
    getAllTicketClass();
  }, [session?.user.token]);

  const updateSeatClass = useUpdateFlightSeatClass();
  const changeSeatClass = async () => {
    let listSeat = chooseSeats.map((s) => s.seat);

    let data = {
      flightId: flight.flightId,
      seatIdList: listSeat,
      class: classToChange,
    };
    if (session?.user.token) {
      try {
        await updateSeatClass(session?.user.token, data);
        setChooseSeats([]);
      } catch (error) {
        console.error("Error updating seat class:", error);
      }
    } else {
      console.error("No access token available");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between">
        <div className="flex justify-end gap-2 items-center">
          {ticketColorClasses.map((type, idx) => (
            <div
              className={`badge text-white bg-${type.color}-500 hover:opacity-70 m-2`}
              key={idx}
            >
              Class: {type.class}
            </div>
          ))}

          <div
            key="s"
            className="badge text-white bg-gray-500 hover:opacity-70 m-2"
          >
            Selected
          </div>
        </div>
        <div>{seatGrid}</div>

        <div className="mt-5">
          <div className="collapse bg-slate-100">
            <input
              type="checkbox"
              onClick={() => {
                setChangeCollapse(!changeCollapse);
                setChooseSeats([]);
              }}
            />
            <div className="collapse-title text-xl font-semibold">
              Change seat class
            </div>
            <div className="collapse-content ">
              <div className=" rounded-2xl p-4 flex flex-col">
                <div className="flex items-center gap-5">
                  <div className="font-semibold">
                    <p className="w-[90px]">Seat select </p>
                    <p className="font-bold text-xl">{chooseSeats.length}</p>
                  </div>
                  <label className="form-control w-full max-w-xs">
                    <select
                      className="select select-bordered"
                      onChange={(e) => setClassToChange(e.target.value)}
                    >
                      <option disabled value="">
                        Choose class you want to change to
                      </option>

                      {ticketColorClasses.map((type, idx) => (
                        <option key={idx} value={type.class}>
                          {type.class}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button onClick={changeSeatClass} className="btn btn-ghost">
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleSeatModal;
