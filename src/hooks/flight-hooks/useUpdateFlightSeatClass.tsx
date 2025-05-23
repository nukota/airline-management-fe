import { useRefreshFlights } from "@/provider/FlightProvider";
import { useSeatFlightDispatch } from "@/provider/FlightRowProvider";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, { useCallback } from "react";

export const useUpdateFlightSeatClass = () => {
  const dispatch = useSeatFlightDispatch();
  const refreshFlights = useRefreshFlights();

  return useCallback(
    async (token: string, data: { seatIdList: string[]; class: string }) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/seat-flight/change-class`;
      const { result, error } = await apiRequest<any>(url, "PUT", token, data);

      if (error) {
        showErrorToast(error);
        return;
      }

      showSuccessToast("Updated successfully");
      dispatch({
        type: "UPDATE_SEATS_CLASS",
        data,
      });
      refreshFlights();
    },
    [dispatch, refreshFlights]
  );
};
