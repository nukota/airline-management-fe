"use client";
import React from "react";
import BookingTable from "./BookingTable";
import BookingReport from "./BookingReport";
import FilterBookingBar from "./FilterBookingBar";

const BookingManage = () => {
  return (
    <div>
      <BookingReport />
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title">
          <div className="text-2xl font-semibold inline-flex items-center">
            Booking Table Management
          </div>
        </div>
        <div className="flex flex-col collapse-content">
          <FilterBookingBar />
          <BookingTable />
        </div>
      </div>
    </div>
  );
};

export default BookingManage;
