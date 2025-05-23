import { useStaffsDispatch, useRefreshStaffs } from "@/provider/StaffProvider";
import { staffEndpoint } from "@/services/axios/endpoints/staff.endpoint";

import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, { useCallback } from "react";

export const useDeleteStaff = () => {
  const dispatch = useStaffsDispatch();
  const refresh = useRefreshStaffs();

  return useCallback(
    async (token: string, id: string) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${staffEndpoint[
        "del-delete-staff"
      ](id)}`;

      const { result, error } = await apiRequest(url, "DELETE", token);

      if (error) {
        showErrorToast(error);
        return;
      }

      showSuccessToast("Delete Staff successfully");
      dispatch({
        type: "delete_staff",
        staffId: id,
      });
      refresh();
    },
    [dispatch, refresh]
  );
};
