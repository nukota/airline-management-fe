"use client";
import useApi from "@/hooks/useApi";
import { BookingType } from "@/interfaces/type";
import { sortByDateDesc } from "@/utils/dataDateSort";
import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from "react";

const BookingContext = createContext<BookingState | null>(null);
const BookingDispatchContext =
  createContext<React.Dispatch<BookingAction> | null>(null);
const BookingRefreshContext = createContext<(() => void) | null>(null);
const OriginalBookingsContext = createContext<BookingState | null>(null);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_SERVER}/booking/list`;
  let { data, refetch } = useApi<BookingState>(baseUrl, "GET");

  const initialState: BookingState = [];
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const [originalBookings, setOriginalBookings] = useState<BookingState>([]);

  useEffect(() => {
    if (data) {
      const sortData = sortByDateDesc(data, "bookedAt");
      setOriginalBookings(sortData);
      dispatch({ type: "set_bookings", bookings: sortData });
    }
  }, [data]);

  const refreshBookings = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <OriginalBookingsContext.Provider value={originalBookings}>
      <BookingContext.Provider value={state}>
        <BookingDispatchContext.Provider value={dispatch}>
          <BookingRefreshContext.Provider value={refreshBookings}>
            {children}
          </BookingRefreshContext.Provider>
        </BookingDispatchContext.Provider>
      </BookingContext.Provider>
    </OriginalBookingsContext.Provider>
  );
};

export function useBookings() {
  const context = useContext(BookingContext);
  if (context === null) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
}

export function useBookingsDispatch() {
  const context = useContext(BookingDispatchContext);
  if (context === null) {
    throw new Error(
      "useBookingsDispatch must be used within a BookingProvider"
    );
  }
  return context;
}

export function useRefreshBookings() {
  const context = useContext(BookingRefreshContext);
  if (context === null) {
    throw new Error("useRefreshBookings must be used within a BookingProvider");
  }
  return context;
}

export function useOriginalBookings() {
  const context = useContext(OriginalBookingsContext);
  if (context === null) {
    throw new Error(
      "useOriginalBookings must be used within a BookingProvider"
    );
  }
  return context;
}

const bookingReducer = (
  state: BookingState,
  action: BookingAction
): BookingState => {
  switch (action.type) {
    case "set_bookings":
      return action.bookings;
    case "reset_bookings":
      return action.originalBookings;
    case "filter_bookings": {
      return action.origin.filter((booking) => {
        const matchesSearch = booking.bookingId
          .toLowerCase()
          .includes(action.searchQuery.toLowerCase());
        const matchesPayment = !action.isPayment || booking.paymentStatus;
        return matchesSearch && matchesPayment;
      });
    }
    default:
      throw new Error(`Unhandled action type`);
  }
};

type BookingState = BookingType[];

type BookingAction =
  | { type: "set_bookings"; bookings: BookingState }
  | { type: "reset_bookings"; originalBookings: BookingState }
  | {
      type: "filter_bookings";
      origin: BookingState;
      searchQuery: string;
      isPayment: boolean;
    };

export default BookingProvider;
