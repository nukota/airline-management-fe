"use client";
import { DataFetchType, FlightType, SeatFlightType } from "@/interfaces/type";
import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  ReactElement,
  useEffect,
  useMemo,
} from "react";
import useApi from "@/hooks/useApi";
import { seatsEndpoint } from "@/services/axios/endpoints/seats.endpoint";

const FlightRowContext = createContext<FlightType | null>(null);
const SeatFlightContext = createContext<SeatFlightType[] | null>(null);
const FlightRowDispatchContext =
  createContext<React.Dispatch<FlightRowAction> | null>(null);
const SeatFlightDispatchContext =
  createContext<React.Dispatch<SeatFlightAction> | null>(null);

type FlightRowProviderProps = {
  children: ReactNode;
  flight: FlightType;
};

export const FlightRowProvider = ({
  children,
  flight,
}: FlightRowProviderProps): ReactElement => {
  const initialState: FlightType = flight;
  const [state, dispatch] = useReducer(flightReducer, initialState);

  const url = `${process.env.NEXT_PUBLIC_SERVER}${seatsEndpoint[
    "get-all-seats-of-flight"
  ](flight.flightId)}`;
  const { data: seats, refetch } = useApi<DataFetchType<SeatFlightType>>(
    url,
    "GET"
  );

  const initialSeats = useMemo(() => (seats ? seats.data : []), [seats]);

  const [seatState, seatDispatch] = useReducer(seatReducer, initialSeats);
  useEffect(() => {
    seatDispatch({
      type: "GET_SEAT_FLIGHT",
      seats: initialSeats,
    });
  }, [initialSeats]);
  return (
    <FlightRowContext.Provider value={state}>
      <FlightRowDispatchContext.Provider value={dispatch}>
        <SeatFlightContext.Provider value={seatState}>
          <SeatFlightDispatchContext.Provider value={seatDispatch}>
            {children}
          </SeatFlightDispatchContext.Provider>
        </SeatFlightContext.Provider>
      </FlightRowDispatchContext.Provider>
    </FlightRowContext.Provider>
  );
};

export function useFlightRow() {
  const context = useContext(FlightRowContext);
  if (context === null) {
    throw new Error("useFlightRow must be used within a FlightRowProvider");
  }
  return context;
}

export function useFlightRowDispatch() {
  const context = useContext(FlightRowDispatchContext);
  if (context === null) {
    throw new Error(
      "useFlightRowDispatch must be used within a FlightRowProvider"
    );
  }
  return context;
}

export function useSeatFlight() {
  const context = useContext(SeatFlightContext);
  if (context === null) {
    throw new Error("useSeatFlight must be used within a FlightRowProvider");
  }
  return context;
}

export function useSeatFlightDispatch() {
  const context = useContext(SeatFlightDispatchContext);
  if (context === null) {
    throw new Error(
      "useSeatFlightDispatch must be used within a FlightRowProvider"
    );
  }
  return context;
}

const flightReducer = (
  state: FlightType,
  action: FlightRowAction
): FlightType => {
  switch (action.type) {
    case "UPDATE_STATUS":
      return { ...state, status: action.status };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.description };
    default:
      throw new Error(`Unhandled action type`);
  }
};

const seatReducer = (
  state: SeatFlightType[],
  action: SeatFlightAction
): SeatFlightType[] => {
  switch (action.type) {
    case "GET_SEAT_FLIGHT":
      return action.seats;
    case "UPDATE_SEATS_CLASS":
      return state.map((seat) => {
        if (action.data.seatIdList.includes(seat.seatId)) {
          return { ...seat, class: action.data.class };
        }
        return seat;
      });
    default:
      throw new Error(`Unhandled action type`);
  }
};

type FlightRowAction =
  | { type: "DELETE_FLIGHT"; id: string }
  | {
      type: "UPDATE_STATUS";
      status: string;
    }
  | {
      type: "UPDATE_DESCRIPTION";
      description: string;
    };

type SeatFlightAction =
  | { type: "GET_SEAT_FLIGHT"; seats: SeatFlightType[] }
  | {
      type: "UPDATE_SEATS_CLASS";
      data: { seatIdList: string[]; class: string };
    };
