import {
  useAirportsDispatch,
  useRefreshAirports,
} from "@/provider/AirportProvider";
import { airportEndpoint } from "@/services/axios/endpoints/airport.endpoint";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, { useCallback } from "react";

export const useDeleteAirport = () => {
  const dispatch = useAirportsDispatch();
  const refresh = useRefreshAirports();

  return useCallback(
    async (token: string, id: string) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${airportEndpoint[
        "del-delete-airport"
      ](id)}`;

      const { result, error } = await apiRequest(url, "DELETE", token);
      if (error) {
        showErrorToast(error);
        return;
      }

      showSuccessToast("Delete Airport successfully");
      dispatch({
        type: "deleted_airport",
        id: id,
      });
      refresh();
    },
    [dispatch, refresh]
  );
};
