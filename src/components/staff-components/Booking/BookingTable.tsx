"use client";
import React, { useState } from "react";
import BookingRowProvider from "@/provider/BookingRowProvider";
import PaginationControl from "../../PaginationControl ";
import { useBookings } from "@/provider/BookingProvider";
import BookingRow from "./BookingRow";

const MAX_LENGTH_COL = 9;

const BookingTable = () => {
  const bookings = useBookings();
  const [page, setPage] = useState<number>(1);
  return (
    <div className="bg-white rounded-2xl p-5 my-3">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>BookingId</th>
              <th>Passenger</th>
              <th>Price</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((cardData, index) => {
              if (
                index >= MAX_LENGTH_COL * (page - 1) &&
                index < MAX_LENGTH_COL * page
              ) {
                return (
                  <BookingRowProvider
                    key={cardData.bookingId}
                    booking={cardData}
                  >
                    <BookingRow
                      key={cardData.bookingId}
                      booking={cardData}
                      index={index}
                    />
                  </BookingRowProvider>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>

      <PaginationControl
        totalItems={bookings.length}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
};

export default BookingTable;
