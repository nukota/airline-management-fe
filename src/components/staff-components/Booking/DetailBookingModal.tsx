"use client";
import { useBookingRow } from "@/provider/BookingRowProvider";
import { apiRequest } from "@/utils/apiRequest";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type DetailBookingModalProps = {
  detailModal: boolean;
  setDetailModal: (state: boolean) => void;
};

const DetailBookingModal: React.FC<DetailBookingModalProps> = ({
  detailModal,
  setDetailModal,
}) => {
  const { data: session } = useSession();
  const [detailBooking, setDetailBooking] = useState<any>();
  const booking = useBookingRow();
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER}/booking/detail/${booking.bookingId}`;
    const getBookingDetail = async () => {
      const { result, error } = await apiRequest(
        url,
        "GET",
        session?.user.token
      );
      setDetailBooking(result);
    };
    getBookingDetail();
  }, [booking, session?.user.token]);

  return (
    <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-2xl">
        <h3 className="font-bold text-2xl">Detail Booking</h3>

        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="font-medium text-sm">Full Name:</span>
              </td>
              <td>
                {" "}
                <span>{detailBooking?.fullName}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="font-medium text-sm">CCCD:</span>
              </td>
              <td>
                {" "}
                <span>{detailBooking?.cccd}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="font-medium text-sm">Email:</span>
              </td>
              <td>
                {" "}
                <span>{detailBooking?.email}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="font-medium text-sm">Phone Number:</span>
              </td>
              <td>
                {" "}
                <span>{detailBooking?.phoneNumber}</span>
              </td>
            </tr>

            <tr>
              <td>
                <span className="font-medium text-sm">Flight ID:</span>
              </td>
              <td>
                {" "}
                <span>{detailBooking?.seatFlight?.flightId}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="font-medium text-sm">Seat:</span>
              </td>
              <td>
                {" "}
                <span>{detailBooking?.seatFlight?.seatId}</span>,
                <span>{detailBooking?.seatFlight?.class}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="font-medium text-sm">Booked At:</span>
              </td>
              <td>
                {" "}
                <span>{detailBooking?.bookedAt}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="modal-action">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setDetailModal(!detailModal)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailBookingModal;
