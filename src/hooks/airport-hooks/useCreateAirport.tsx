import {
  useAirportsDispatch,
  useRefreshAirports,
} from "@/provider/AirportProvider";
import { airportEndpoint } from "@/services/axios/endpoints/airport.endpoint";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, { useCallback } from "react";

export const useCreateAirport = () => {
  const dispatch = useAirportsDispatch();
  const refresh = useRefreshAirports();

  return useCallback(
    async (token: string, data: any) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${airportEndpoint["post-create-airport"]}`;

      const { result, error } = await apiRequest(url, "POST", token, data);

      if (error) {
        showErrorToast(error);
        return;
      }

      showSuccessToast("Create Airport successfully");
      //   dispatch({
      //     type: "created_airport",
      //   });
      refresh();
    },
    [refresh]
  );
};
