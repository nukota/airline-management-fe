import {
  useFlightDispatch,
  useRefreshFlights,
} from "@/provider/FlightProvider";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, { useCallback } from "react";

export const useCreateNewFlight = () => {
  const dispatch = useFlightDispatch();
  const refreshFlights = useRefreshFlights();

  return useCallback(
    async (token: string, createForm: any, intermediate?: any) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/flight`;

      const { result, error } = await apiRequest<any>(
        url,
        "POST",
        token,
        createForm
      );

      if (error) {
        showErrorToast(error);
        return;
      }

      showSuccessToast("Create new flight successfully");
      dispatch({
        type: "create_new_flights",
      });
      refreshFlights();
    },
    [dispatch, refreshFlights]
  );
};
