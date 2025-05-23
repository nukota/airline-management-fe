"use client";

import { useFlightRow } from "@/provider/FlightRowProvider";

import React, { useState } from "react";
import HandleSeatModal from "./HandleSeatModal";

const SeatModal = () => {
  const flight = useFlightRow();
  const [showSeatModal, setShowSeatModal] = useState<boolean>(false);

  return (
    <div>
      <div className="tooltip" data-tip="Detail seats ">
        <button
          onClick={() => {
            setShowSeatModal(true);
          }}
          className={`btn btn-ghost btn-xs font-medium ${
            flight.seatsAvailable > 0 ? "text-green-400" : "text-rose-400"
          }`}
        >
          {flight.seatsAvailable}/{flight.seatsTotal}
        </button>
      </div>
      {showSeatModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Seat Flight </h3>

            <div className="flex flex-col justify-between">
              <HandleSeatModal />
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setShowSeatModal(false)}
              >
                Close
              </button>
              <button
                className="btn bg-green-500 btn-sm text-white"
                onClick={() => setShowSeatModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatModal;
