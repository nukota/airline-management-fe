"use client";
import { DataFetchType, Staff } from "@/interfaces/type";
import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import useApi from "@/hooks/useApi";
import { sortByDateDesc } from "@/utils/dataDateSort";
import { staffEndpoint } from "@/services/axios/endpoints/staff.endpoint";

const StaffsContext = createContext<StaffState | null>(null);
const StaffsDispatchContext =
  createContext<React.Dispatch<StaffTaskAction> | null>(null);
const StaffRefreshContext = createContext<(() => void) | null>(null);
const OriginalStaffsContext = createContext<StaffState | null>(null);

export const StaffsProvider = ({ children }: { children: ReactNode }) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER}${staffEndpoint["get-list-all-staff"]}`;
  let { data, refetch } = useApi<DataFetchType<Staff>>(url, "GET");

  const initialState: StaffState = [];
  const [tickets, dispatch] = useReducer(tasksReducer, initialState);

  const [originalStaffs, setOriginalStaffs] = useState<StaffState>([]);

  useEffect(() => {
    if (data?.data) {
      const sortData = sortByDateDesc(data?.data, "creatAt");
      setOriginalStaffs(sortData);
      dispatch({ type: "set_staffs", data: sortData });
    }
  }, [data]);

  const refreshStaffs = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <OriginalStaffsContext.Provider value={originalStaffs}>
      <StaffsContext.Provider value={tickets}>
        <StaffsDispatchContext.Provider value={dispatch}>
          <StaffRefreshContext.Provider value={refreshStaffs}>
            {children}
          </StaffRefreshContext.Provider>
        </StaffsDispatchContext.Provider>
      </StaffsContext.Provider>
    </OriginalStaffsContext.Provider>
  );
};

export function useStaffs() {
  const context = useContext(StaffsContext);
  if (context === null) {
    throw new Error("useStaffs must be used within a StaffsProvider");
  }
  return context;
}

export function useStaffsDispatch() {
  const context = useContext(StaffsDispatchContext);
  if (context === null) {
    throw new Error("useStaffsDispatch must be used within a StaffsProvider");
  }
  return context;
}
export function useOriginalStaffs() {
  const context = useContext(OriginalStaffsContext);
  if (context === null) {
    throw new Error("useStaffsDispatch must be used within a StaffsProvider");
  }
  return context;
}
export function useRefreshStaffs() {
  const context = useContext(StaffRefreshContext);
  if (context === null) {
    throw new Error("useRefreshStaffs must be used within a BookingProvider");
  }
  return context;
}
const tasksReducer = (
  state: StaffState,
  action: StaffTaskAction
): StaffState => {
  switch (action.type) {
    case "set_staffs":
      return action.data;
    case "create_staff":
      return [...state, action.data];
    case "delete_staff":
      return state.filter((staff) => staff.staffId !== action.staffId);
    case "filter_staffs":
      return action.origin.filter((staff) => {
        const { username, role } = action.query;
        const matchesName = username
          ? staff.username.toLowerCase().includes(username.toLowerCase())
          : true;
        const matchesRole = role
          ? staff.role.toLowerCase().includes(role.toLowerCase())
          : true;
        return matchesName && matchesRole;
      });
    default:
      throw new Error(`Unhandled action type: `);
  }
};

type StaffState = Staff[];

export type StaffTaskAction =
  | { type: "set_staffs"; data: StaffState }
  | { type: "create_staff"; data: Staff }
  | { type: "delete_staff"; staffId: string }
  | {
      type: "filter_staffs";
      origin: StaffState;
      query: {
        username?: string;
        role?: string;
      };
    };

export default StaffsProvider;
