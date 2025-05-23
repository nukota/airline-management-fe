import {
  useCustomersDispatch,
  useRefreshCustomers,
} from "@/provider/CustomerProvider";
import { customerEndpoint } from "@/services/axios/endpoints/customer.endpoint";

import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, { useCallback } from "react";

export const useDeleteCustomer = () => {
  const dispatch = useCustomersDispatch();
  const refresh = useRefreshCustomers();

  return useCallback(
    async (token: string, id: string) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${customerEndpoint[
        "delete-by-id"
      ](id)}`;

      const { result, error } = await apiRequest(url, "DELETE", token);

      if (error) {
        showErrorToast(error);
        return;
      }

      showSuccessToast("Delete Customer successfully");
      dispatch({
        type: "delete_customer",
        customerId: id,
      });
      refresh();
    },
    [dispatch, refresh]
  );
};
