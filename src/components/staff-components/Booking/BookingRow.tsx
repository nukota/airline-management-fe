import React, { useEffect, useState } from "react";

import InformationCard from "../../InformationCard";
import { BookingType } from "@/interfaces/type";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import DetailBookingModal from "./DetailBookingModal";
import CancelBookingModal from "./CancelBookingModal";
import { useCreateAndPrintTicket } from "@/hooks/booking-hooks/useCreateAndPrintTicket";

const BookingRow: React.FC<{ booking: BookingType; index: number }> = ({
  booking,
  index,
}) => {
  const { data: session } = useSession();
  const statusColor = (status: any) => {
    switch (status) {
      case "BOOKED":
        return `btn btn-ghost text-green-400 btn-xs`;
      case "NotBooked":
        return `btn btn-ghost text-yellow-400 btn-xs`;
      case "Cancelled":
        return `btn btn-ghost text-red-400 btn-xs`;
      default:
        return `btn btn-ghost text-blue-400 btn-xs`;
    }
  };
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [canceledModal, setCanceledModal] = useState<boolean>(false);

  const createAndPrint = useCreateAndPrintTicket();

  const handleCreateAndPrintTicket = async () => {
    if (session?.user.token) {
      await createAndPrint(session?.user.id, booking.bookingId);
    } else {
      console.error("No access token available");
    }
  };
  return (
    <tr key={index}>
      <th>
        <label>
          <span>{index}</span>
        </label>
      </th>
      <td>
        <div className="tooltip" data-tip={booking.bookingId}>
          <span className="font-semibold">
            {booking.bookingId.slice(0, 8).concat("...")}
          </span>
        </div>
      </td>
      <td>
        <InformationCard passengerId={booking.passengerId} />
      </td>
      <td>
        <span className="font-semibold">{booking.price}</span>
      </td>
      <td>
        BookedAt: <span className="font-semibold">{booking.bookedAt}</span>
        <br />
        UpdateAt: <span className="text-sm">{booking.updateAt}</span>
      </td>
      <td>
        <div className="tooltip" data-tip="Detail seats ">
          {booking.paymentStatus ? (
            <button className="btn btn-ghost text-green-400 btn-xs font-medium">
              {booking.paymentStatus.toString()}
            </button>
          ) : (
            <button className="btn btn-ghost text-rose-400 btn-xs font-medium">
              {booking.paymentStatus.toString()}
            </button>
          )}
        </div>
      </td>
      <td>
        <div className="tooltip">
          <button className={statusColor(booking.bookingStatus)}>
            {booking.bookingStatus}
          </button>
        </div>
      </td>
      <td className="flex flex-col mt-3 justify-center">
        <Dropdown key={booking.bookingId} className="flex justify-center">
          <DropdownTrigger>
            <Button variant="bordered">
              <svg
                key={index}
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
            aria-label="Static Actions"
            className="bg-white rounded-xl drop-shadow-lg p-3"
          >
            <DropdownItem
              textValue="dropdown"
              key={`upload-${booking.bookingId}`}
              className="btn btn-sm btn-ghost"
            >
              <div
                className="flex justify-between gap-3"
                onClick={() => {
                  setDetailModal(!detailModal);
                }}
              >
                <p>Detail Booking</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192 512"
                  className="w-4 h-4"
                >
                  <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
                </svg>
              </div>
            </DropdownItem>
            <DropdownItem
              textValue="dropdown"
              key={`upload-${booking.bookingId}`}
              className="btn btn-sm btn-ghost"
            >
              <div
                className="flex justify-between gap-3"
                onClick={handleCreateAndPrintTicket}
              >
                <p>Create & print ticket</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4"
                >
                  <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                </svg>
              </div>
            </DropdownItem>

            <DropdownItem textValue="dropdown" className="h-2">
              <div className="divider m-0 divider-neutral opacity-50 h-[1px]"></div>
            </DropdownItem>

            <DropdownItem
              textValue="dropdown"
              key={`delete-${booking.bookingId}`}
              className="btn btn-sm btn-ghost text-red-600"
              onClick={() => setCanceledModal(!canceledModal)}
            >
              <div className="flex justify-between">
                <p> Canel booking</p>
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
      </td>
      {detailModal && (
        <DetailBookingModal
          detailModal={detailModal}
          setDetailModal={setDetailModal}
        />
      )}
      {canceledModal && (
        <CancelBookingModal
          canceledModal={canceledModal}
          setCanceledModal={setCanceledModal}
        />
      )}
    </tr>
  );
};
export default BookingRow;
