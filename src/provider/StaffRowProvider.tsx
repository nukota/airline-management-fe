import { Staff } from "@/interfaces/type";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useReducer,
} from "react";

const StaffRowContext = createContext<Staff | null>(null);
const StaffRowDispatchContext =
  createContext<React.Dispatch<StaffRowAction> | null>(null);

type StaffRowProviderProps = {
  children: ReactNode;
  staff: Staff;
};

export const StaffRowProvider = ({
  children,
  staff,
}: StaffRowProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(bookingReducer, staff);

  return (
    <StaffRowContext.Provider value={state}>
      <StaffRowDispatchContext.Provider value={dispatch}>
        {children}
      </StaffRowDispatchContext.Provider>
    </StaffRowContext.Provider>
  );
};
export function useStaffRow() {
  const context = useContext(StaffRowContext);
  if (context === null) {
    throw new Error("useStaffRow must be used within a StaffRowProvider");
  }
  return context;
}
export function useStaffRowDispatch() {
  const context = useContext(StaffRowDispatchContext);
  if (context === null) {
    throw new Error(
      "useStaffRowDispatch must be used within a StaffRowProvider"
    );
  }
  return context;
}

type StaffRowAction = { type: "DELETE_CUSTOMER"; token: string; id: string };

const bookingReducer = (state: Staff, action: StaffRowAction): Staff => {
  switch (action.type) {
    default:
      return state;
  }
};
