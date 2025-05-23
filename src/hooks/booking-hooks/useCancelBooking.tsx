import { useRefreshBookings } from "@/provider/BookingProvider";
import { useBookingRowDispatch } from "@/provider/BookingRowProvider";
import { bookingEndpoint } from "@/services/axios/endpoints/booking.endpoint";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback } from "react";

export const useCancelBooking = () => {
  const dispatch = useBookingRowDispatch();
  const refreshBookings = useRefreshBookings();

  return useCallback(
    async (token: string, id: string) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${bookingEndpoint[
        "put-cancel-booking"
      ](id)}`;
      const { result, error } = await apiRequest(url, "PUT", token);

      if (error) {
        showErrorToast(error);
        return;
      }
      console.log(result);
      showSuccessToast("Booking canceled successfully");
      dispatch({ type: "CANCEL_BOOKING", token, id });
      refreshBookings();
    },
    [dispatch, refreshBookings]
  );
};
