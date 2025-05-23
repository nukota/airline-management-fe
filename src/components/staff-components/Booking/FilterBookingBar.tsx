"use client";
import {
  useBookingsDispatch,
  useOriginalBookings,
} from "@/provider/BookingProvider";
import React, { useEffect, useState } from "react";

const FilterBookingBar = () => {
  const originalBookings = useOriginalBookings();
  const dispatch = useBookingsDispatch();
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    dispatch({
      type: "filter_bookings",
      origin: originalBookings,
      searchQuery,
      isPayment,
    });
  }, [searchQuery, isPayment, dispatch, originalBookings]);

  return (
    <div className="flex justify-between items-center">
      <label className="input input-bordered flex items-center gap-2 ">
        <p>Booking Id</p>
        <input
          type="text"
          id="bookingId"
          className="grow font-medium"
          placeholder=""
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <div className="flex rounded-md p-1 items-center justify-around h-12 bg-base-300">
        <div
          className={`cursor-pointer ${
            !isPayment
              ? "bg-white flex justify-center rounded-md px-5 py-2 text-sm font-medium"
              : "flex justify-center rounded-md px-5 py-2 text-sm font-medium"
          }`}
          onClick={() => setIsPayment(false)}
        >
          All
        </div>

        <div
          className={`cursor-pointer ${
            isPayment
              ? "bg-white flex justify-center rounded-md px-5 py-2 text-sm font-medium"
              : "flex justify-center rounded-md px-5 py-2 text-sm font-medium"
          }`}
          onClick={() => setIsPayment(true)}
        >
          Pays
        </div>
      </div>
    </div>
  );
};

export default FilterBookingBar;
