import {
  useFlightDispatch,
  useRefreshFlights,
} from "@/provider/FlightProvider";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, { useCallback } from "react";

export const useDeleteFlight = () => {
  const dispatch = useFlightDispatch();
  const refreshFlights = useRefreshFlights();

  return useCallback(
    async (token: string, id: string) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/flight/${id}`;

      const { result, error } = await apiRequest<any>(url, "DELETE", token);

      if (error) {
        showErrorToast(error);
        return;
      }

      showSuccessToast("Delete successfully");
      dispatch({
        type: "deleted_flights",
        flightId: id,
      });
      refreshFlights();
    },
    [dispatch, refreshFlights]
  );
};
