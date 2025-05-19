import { useStaffsDispatch, useRefreshStaffs } from "@/provider/StaffProvider";
import { staffEndpoint } from "@/services/axios/endpoints/staff.endpoint";

import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, { useCallback } from "react";

export const useCreateStaff = () => {
  const dispatch = useStaffsDispatch();
  const refresh = useRefreshStaffs();

  return useCallback(
    async (token: string, data: any) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${staffEndpoint["post-create-new"]}`;

      const { result, error } = await apiRequest(url, "POST", token, data);

      if (error) {
        showErrorToast(error);
        return;
      }

      showSuccessToast("Create Staff successfully");
      //   dispatch({
      //     type: "create_staff",
      //     data: data,
      //   });
      refresh();
    },
    [refresh]
  );
};
