import { useRefreshFlights } from "@/provider/FlightProvider";
import { useFlightRowDispatch } from "@/provider/FlightRowProvider";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, { useCallback } from "react";

export const useUpdateFlightDescription = () => {
  const dispatch = useFlightRowDispatch();
  const refreshFlights = useRefreshFlights();

  return useCallback(
    async (token: string, description: string, id: string) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/flight/${id}`;
      const data = JSON.stringify({
        description: description,
      });
      const { result, error } = await apiRequest<any>(url, "PUT", token, data);

      if (error) {
        showErrorToast(error);
        return;
      }

      showSuccessToast("Updated successfully");
      dispatch({
        type: "UPDATE_DESCRIPTION",
        description: description,
      });
      refreshFlights();
    },
    [dispatch, refreshFlights]
  );
};
