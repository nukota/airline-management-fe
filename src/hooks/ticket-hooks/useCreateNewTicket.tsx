import { useRefreshBookings } from "@/provider/BookingProvider";
import {
  useRefreshTickets,
  useTicketsDispatch,
} from "@/provider/TicketsProvider";
import { ticketEndpoint } from "@/services/axios/endpoints/ticket.endpoint";
import { TicketType } from "@/interfaces/type";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback } from "react";

export const useCreateNewTicket = () => {
  const dispatch = useTicketsDispatch();
  const refreshTickets = useRefreshTickets();

  return useCallback(
    async (token: string, data: any) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${ticketEndpoint["post-create-new-ticket"]}`;
      const { result, error } = await apiRequest(url, "POST", token, data);

      if (error) {
        showErrorToast(error);
        return;
      }
      console.log(result);
      showSuccessToast("Create new Ticket successfully");
      dispatch({ type: "created_ticket", data: result as TicketType });
      refreshTickets();
    },
    [dispatch, refreshTickets]
  );
};
