import { useCancelBooking } from "@/hooks/booking-hooks/useCancelBooking";
import { useBookingRow } from "@/provider/BookingRowProvider";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type CancelBookingModalProps = {
  canceledModal: boolean;
  setCanceledModal: (state: boolean) => void;
};

const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
  canceledModal,
  setCanceledModal,
}) => {
  const { data: session } = useSession();
  const cancelBooking = useCancelBooking();
  const booking = useBookingRow();

  const [checkCancel, setCheckCancel] = useState<boolean>(false);
  const handleCancelBooking = async () => {
    if (session?.user.token) {
      await cancelBooking(session?.user.token, booking.bookingId);
    } else {
      console.error("No access token available");
    }
  };
  return (
    <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-2xl">
        <h3 className="font-bold text-2xl">Cancel Booking</h3>
        <label className="inline-flex items-center  mt-5">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={checkCancel}
            onChange={(e) => setCheckCancel(e.target.checked)}
          />
          <span className="ml-2 text-black">Confirm to cancel booking</span>
        </label>
        <div className="flex flex-col justify-between"></div>
        <div className="modal-action">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => {
              setCheckCancel(!checkCancel);
              setCanceledModal(!canceledModal);
            }}
          >
            Close
          </button>
          {checkCancel && (
            <button
              type="button"
              className="btn btn-sm bg-green-500 text-white"
              onClick={handleCancelBooking}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
