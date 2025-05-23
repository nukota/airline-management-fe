import { useRefreshFlights } from "@/provider/FlightProvider";
import { useFlightRowDispatch } from "@/provider/FlightRowProvider";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, { useCallback } from "react";

export const useUpdateFlightStatus = () => {
  const dispatch = useFlightRowDispatch();
  const refreshFlights = useRefreshFlights();

  return useCallback(
    async (status: string, token: string, id: string) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/flight/${status}/${id}`;
      const { result, error } = await apiRequest<any>(url, "PUT", token);
      console.log(result);
      if (error) {
        showErrorToast(error);
        return;
      }

      showSuccessToast("Updated successfully");
      dispatch({
        type: "UPDATE_STATUS",
        status: result?.updateData.status,
      });
      refreshFlights();
    },
    [dispatch, refreshFlights]
  );
};
