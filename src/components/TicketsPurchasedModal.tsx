"use client";

import React, { useState } from "react";
import TicketCard from "./TIcketCard";
import { useSession } from "next-auth/react";
import { BookingType } from "@/interfaces/type";

const TicketsPurchasedModal: React.FC<{ allBookings: BookingType[] }> = ({
  allBookings,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <div className="w-full">
      <div className="w-full">
        <button
          onClick={() => setShowModal(true)}
          className="btn w-full bg-blue-600 text-white px-4 py-2 rounded-lg btn-ghost transition duration-300"
        >
          See all booking recently
        </button>

        {showModal && (
          <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 ">
              <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4 mb-5">
                <h2 className="text-2xl font-semibold">
                  My purchased ticket list
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="p-5 max-h-[600px] overflow-y-auto bg-base-200 rounded-lg">
                {allBookings.map((book, index) => (
                  <div key={index}>
                    <TicketCard
                      bookingId={book.bookingId}
                      flightId={book.flightId}
                      bookedAt={book.bookedAt}
                      paymentStatus={book.paymentStatus}
                      seatId={book.seatId}
                      seatClass={book.class}
                      price={book.price}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsPurchasedModal;
