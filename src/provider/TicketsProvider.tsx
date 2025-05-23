"use client";
import { DataFetchType, TicketType } from "@/interfaces/type";
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

const TicketsContext = createContext<TicketState | null>(null);
const TicketsDispatchContext =
  createContext<React.Dispatch<TicketTaskAction> | null>(null);
const TicketRefreshContext = createContext<(() => void) | null>(null);
const OriginalTicketsContext = createContext<TicketState | null>(null);

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER}/ticket/list`;
  let { data, refetch } = useApi<DataFetchType<TicketType>>(url, "GET");

  const initialState: TicketState = [];
  const [tickets, dispatch] = useReducer(tasksReducer, initialState);

  const [originalTickets, setOriginalTickets] = useState<TicketState>([]);

  useEffect(() => {
    if (data?.data) {
      const sortData = sortByDateDesc(data?.data, "sellAt");
      setOriginalTickets(sortData);
      dispatch({ type: "set_tickets", tasks: sortData });
    }
  }, [data]);

  const refreshTickets = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <OriginalTicketsContext.Provider value={originalTickets}>
      <TicketsContext.Provider value={tickets}>
        <TicketsDispatchContext.Provider value={dispatch}>
          <TicketRefreshContext.Provider value={refreshTickets}>
            {children}
          </TicketRefreshContext.Provider>
        </TicketsDispatchContext.Provider>
      </TicketsContext.Provider>
    </OriginalTicketsContext.Provider>
  );
};

export function useTickets() {
  const context = useContext(TicketsContext);
  if (context === null) {
    throw new Error("useTickets must be used within a TicketsProvider");
  }
  return context;
}

export function useTicketsDispatch() {
  const context = useContext(TicketsDispatchContext);
  if (context === null) {
    throw new Error("useTicketsDispatch must be used within a TicketsProvider");
  }
  return context;
}
export function useOriginalTickets() {
  const context = useContext(OriginalTicketsContext);
  if (context === null) {
    throw new Error("useTicketsDispatch must be used within a TicketsProvider");
  }
  return context;
}
export function useRefreshTickets() {
  const context = useContext(TicketRefreshContext);
  if (context === null) {
    throw new Error("useRefreshTickets must be used within a BookingProvider");
  }
  return context;
}

const tasksReducer = (
  state: TicketState,
  action: TicketTaskAction
): TicketState => {
  switch (action.type) {
    case "set_tickets":
      return action.tasks;
    case "created_ticket":
      return [...state, action.data];
    case "filter_ticket": {
      if (action.typeId === "ticketId")
        return action.originTickets.filter((ticket) =>
          ticket.ticketId.includes(action.query.toLowerCase())
        );
      else if (action.typeId === "flightId")
        return action.originTickets.filter((ticket) =>
          ticket.flightId.includes(action.query.toLowerCase())
        );
      else if (action.typeId === "bookingId")
        return action.originTickets.filter((ticket) =>
          ticket.seatFlight.bookingId.includes(action.query.toLowerCase())
        );
    }
    default:
      throw new Error(`Unhandled action type: `);
  }
};

type TicketState = TicketType[];

export type TicketTaskAction =
  | { type: "set_tickets"; tasks: TicketType[] }
  | { type: "created_ticket"; data: TicketType }
  | {
      type: "filter_ticket";
      originTickets: TicketState;
      typeId: string;
      query: string;
    };

export default TicketsProvider;
