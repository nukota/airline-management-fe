"use client";

import { BookingType } from "@/interfaces/type";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  ReactElement,
  useCallback,
} from "react";
import { useRefreshBookings } from "./BookingProvider";

const BookingRowContext = createContext<BookingType | null>(null);
const BookingRowDispatchContext =
  createContext<React.Dispatch<BookingRowAction> | null>(null);

type BookingRowProviderProps = {
  children: ReactNode;
  booking: BookingType;
};

export const BookingRowProvider = ({
  children,
  booking,
}: BookingRowProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(bookingReducer, booking);

  return (
    <BookingRowContext.Provider value={state}>
      <BookingRowDispatchContext.Provider value={dispatch}>
        {children}
      </BookingRowDispatchContext.Provider>
    </BookingRowContext.Provider>
  );
};
export function useBookingRow() {
  const context = useContext(BookingRowContext);
  if (context === null) {
    throw new Error("useBookingRow must be used within a BookingRowProvider");
  }
  return context;
}
export function useBookingRowDispatch() {
  const context = useContext(BookingRowDispatchContext);
  if (context === null) {
    throw new Error(
      "useBookingRowDispatch must be used within a BookingRowProvider"
    );
  }
  return context;
}

type BookingRowAction =
  | { type: "CANCEL_BOOKING"; token: string; id: string }
  | { type: "CREATE_AND_PRINT_TICKET"; token: string; id: string };

const bookingReducer = (
  state: BookingType,
  action: BookingRowAction
): BookingType => {
  switch (action.type) {
    case "CANCEL_BOOKING": {
      return { ...state };
    }
    case "CREATE_AND_PRINT_TICKET": {
      return { ...state };
    }
    default:
      return state;
  }
};

export default BookingRowProvider;
