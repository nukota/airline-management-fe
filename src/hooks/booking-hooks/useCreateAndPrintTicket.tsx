import { useRefreshBookings } from "@/provider/BookingProvider";
import { useBookingRowDispatch } from "@/provider/BookingRowProvider";
import { ticketEndpoint } from "@/services/axios/endpoints/ticket.endpoint";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback } from "react";

export const useCreateAndPrintTicket = () => {
  const dispatch = useBookingRowDispatch();
  const refreshBookings = useRefreshBookings();

  return useCallback(
    async (token: string, id: string) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${ticketEndpoint[
        "get-create-and-print-ticket-by-id"
      ](id, token)}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {},
        });
        showSuccessToast("Create and print Ticket successfully");
        dispatch({ type: "CREATE_AND_PRINT_TICKET", token, id });
        refreshBookings();
      } catch (error: any) {
        console.error(error);
        showErrorToast(error.message);
      }
    },
    [dispatch, refreshBookings]
  );
};
