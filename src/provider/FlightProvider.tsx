// FlightProvider.tsx
"use client";
import useApi from "@/hooks/useApi";
import { DataFetchType, FlightType } from "@/interfaces/type";
import { sortByDateDesc } from "@/utils/dataDateSort";
import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";

const FlightContext = createContext<FlightState | null>(null);
const FlightDispatchContext =
  createContext<React.Dispatch<FlightAction> | null>(null);
const FlightRefreshContext = createContext<(() => void) | null>(null);
const OriginalFlightsContext = createContext<FlightState | null>(null);

export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_SERVER}/flight`;
  const { data, refetch } = useApi<DataFetchType<FlightType>>(baseUrl, "GET");

  const flightData = data?.data;
  const initialState: FlightState = [];
  const [state, dispatch] = useReducer(flightReducer, initialState);
  const [originalFlights, setOriginalFlights] = useState<FlightState>([]);

  useEffect(() => {
    if (flightData) {
      const sortData = sortByDateDesc(flightData, "createAt");
      setOriginalFlights(sortData);
      dispatch({ type: "set_flights", flights: sortData });
    }
  }, [flightData]);

  const refreshFlights = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <OriginalFlightsContext.Provider value={originalFlights}>
      <FlightContext.Provider value={state}>
        <FlightDispatchContext.Provider value={dispatch}>
          <FlightRefreshContext.Provider value={refreshFlights}>
            {children}
          </FlightRefreshContext.Provider>
        </FlightDispatchContext.Provider>
      </FlightContext.Provider>
    </OriginalFlightsContext.Provider>
  );
};

export function useFlight() {
  const context = useContext(FlightContext);
  if (context === null) {
    throw new Error("useFlight must be used within a FlightProvider");
  }
  return context;
}

export function useFlightDispatch() {
  const context = useContext(FlightDispatchContext);
  if (context === null) {
    throw new Error("useFlightDispatch must be used within a FlightProvider");
  }
  return context;
}
export function useRefreshFlights() {
  const context = useContext(FlightRefreshContext);
  if (context === null) {
    throw new Error(
      "FlightRefreshContext must be used within a BookingProvider"
    );
  }
  return context;
}
export function useOriginalFlights() {
  const context = useContext(OriginalFlightsContext);
  if (context === null) {
    throw new Error(
      "OriginalFlightsContext must be used within a BookingProvider"
    );
  }
  return context;
}

const flightReducer = (
  state: FlightState,
  action: FlightAction
): FlightState => {
  switch (action.type) {
    case "set_flights":
      return action.flights;
    case "create_new_flights":
      return [...state];
    case "deleted_flights":
      return state.filter((flight) => flight.flightId !== action.flightId);
    case "filter_flights": {
      return action.origin.filter((flight) => {
        return (
          flight.flightId
            .toLowerCase()
            .includes(action.searchQuery.id.toLowerCase()) &&
          flight.departureAirport.city
            .toLowerCase()
            .includes(action.searchQuery.departure.toLowerCase()) &&
          flight.arrivalAirport.city
            .toLowerCase()
            .includes(action.searchQuery.destination.toLowerCase()) &&
          flight.departureTime.includes(action.searchQuery.date) &&
          flight.status
            .toLowerCase()
            .includes(action.searchQuery.status.toLowerCase())
        );
      });
    }
    default:
      throw new Error(`Unhandled action type`);
  }
};

type FlightState = FlightType[];

type FlightAction =
  | { type: "set_flights"; flights: FlightState }
  | { type: "create_new_flights" }
  | { type: "deleted_flights"; flightId: string }
  | {
      type: "filter_flights";
      origin: FlightState;
      searchQuery: {
        id: string;
        departure: string;
        date: string;
        destination: string;
        status: string;
      };
    };
export default FlightProvider;
