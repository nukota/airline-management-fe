"use client";
import { DataFetchType, AirportType } from "@/interfaces/type";
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
import { airportEndpoint } from "@/services/axios/endpoints/airport.endpoint";

const AirportsContext = createContext<AirportState | null>(null);
const AirportsDispatchContext =
  createContext<React.Dispatch<AirportTaskAction> | null>(null);
const AirportRefreshContext = createContext<(() => void) | null>(null);
const OriginalAirportsContext = createContext<AirportState | null>(null);

export const AirportsProvider = ({ children }: { children: ReactNode }) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER}${airportEndpoint["get-all-airport"]}`;
  let { data, refetch } = useApi<DataFetchType<AirportType>>(url, "GET");
  const initialState: AirportState = [];
  const [airports, dispatch] = useReducer(tasksReducer, initialState);

  const [originalAirports, setOriginalAirports] = useState<AirportState>([]);

  useEffect(() => {
    if (data?.data) {
      const sortData = sortByDateDesc(data?.data, "create_at");
      setOriginalAirports(sortData);
      dispatch({ type: "set_airports", tasks: sortData });
    }
  }, [data]);

  const refreshAirports = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <OriginalAirportsContext.Provider value={originalAirports}>
      <AirportsContext.Provider value={airports}>
        <AirportsDispatchContext.Provider value={dispatch}>
          <AirportRefreshContext.Provider value={refreshAirports}>
            {children}
          </AirportRefreshContext.Provider>
        </AirportsDispatchContext.Provider>
      </AirportsContext.Provider>
    </OriginalAirportsContext.Provider>
  );
};

export function useAirports() {
  const context = useContext(AirportsContext);
  if (context === null) {
    throw new Error("useAirports must be used within a AirportsProvider");
  }
  return context;
}

export function useAirportsDispatch() {
  const context = useContext(AirportsDispatchContext);
  if (context === null) {
    throw new Error(
      "useAirportsDispatch must be used within a AirportsProvider"
    );
  }
  return context;
}
export function useOriginalAirports() {
  const context = useContext(OriginalAirportsContext);
  if (context === null) {
    throw new Error(
      "useAirportsDispatch must be used within a AirportsProvider"
    );
  }
  return context;
}
export function useRefreshAirports() {
  const context = useContext(AirportRefreshContext);
  if (context === null) {
    throw new Error("useRefreshAirports must be used within a BookingProvider");
  }
  return context;
}

const tasksReducer = (
  state: AirportState,
  action: AirportTaskAction
): AirportState => {
  switch (action.type) {
    case "set_airports":
      return action.tasks;
    case "created_airport":
      return [...state, action.data];
    case "filter_airport":
      return action.originAirports.filter((airport) => {
        const matchesCountry = action.query.country
          ? airport.country
              .toLowerCase()
              .includes(action.query.country.toLowerCase())
          : true;
        const matchesCity = action.query.city
          ? airport.city.toLowerCase().includes(action.query.city.toLowerCase())
          : true;

        return matchesCountry && matchesCity;
      });
    default:
      throw new Error(`Unhandled action type: `);
  }
};

type AirportState = AirportType[];

export type AirportTaskAction =
  | { type: "set_airports"; tasks: AirportType[] }
  | { type: "created_airport"; data: AirportType }
  | { type: "deleted_airport"; id: string }
  | {
      type: "filter_airport";
      originAirports: AirportState;
      query: {
        country?: string;
        city?: string;
        available?: boolean;
      };
    };

export default AirportsProvider;
