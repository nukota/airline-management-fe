"use client";
import { DataFetchType, TicketClassType } from "@/interfaces/type";
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
import { ticketClassEndpoint } from "@/services/axios/endpoints/ticket-class.endpoint";

const TicketClassContext = createContext<TicketClassType[] | null>(null);
const TicketClassDispatchContext =
  createContext<React.Dispatch<RuleTaskAction> | null>(null);
const RuleRefreshContext = createContext<(() => void) | null>(null);
const OriginalTicketClassContext = createContext<TicketClassType[]>([]);

export const TicketClassTypeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER}${ticketClassEndpoint["get-all-ticket-class"]}`;
  let { data, refetch } = useApi<DataFetchType<TicketClassType>>(url, "GET");

  const initialState: TicketClassType[] = [];
  const [rules, dispatch] = useReducer(tasksReducer, initialState);

  const [originalTicketClass, setOriginalTicketClass] = useState<
    TicketClassType[]
  >([]);

  useEffect(() => {
    if (data?.data) {
      setOriginalTicketClass(data?.data);
      dispatch({ type: "set_ticket_class", ticketClass: data?.data });
    }
  }, [data]);

  const refreshTicketClass = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <OriginalTicketClassContext.Provider value={originalTicketClass}>
      <TicketClassContext.Provider value={rules}>
        <TicketClassDispatchContext.Provider value={dispatch}>
          <RuleRefreshContext.Provider value={refreshTicketClass}>
            {children}
          </RuleRefreshContext.Provider>
        </TicketClassDispatchContext.Provider>
      </TicketClassContext.Provider>
    </OriginalTicketClassContext.Provider>
  );
};

export function useTicketClass() {
  const context = useContext(TicketClassContext);
  if (context === null) {
    throw new Error("useTicketClass must be used within a TicketClassProvider");
  }
  return context;
}

export function useTicketClassDispatch() {
  const context = useContext(TicketClassDispatchContext);
  if (context === null) {
    throw new Error(
      "useTicketClassDispatch must be used within a TicketClassProvider"
    );
  }
  return context;
}
export function useOriginalTicketClass() {
  const context = useContext(OriginalTicketClassContext);
  if (context === null) {
    throw new Error(
      "useTicketClassDispatch must be used within a TicketClassProvider"
    );
  }
  return context;
}
export function useRefreshTicketClass() {
  const context = useContext(RuleRefreshContext);
  if (context === null) {
    throw new Error(
      "useRefreshTicketClass must be used within a BookingProvider"
    );
  }
  return context;
}

const tasksReducer = (
  state: TicketClassType[],
  action: RuleTaskAction
): TicketClassType[] => {
  switch (action.type) {
    case "set_ticket_class":
      return action.ticketClass;
    default:
      throw new Error(`Unhandled action type: `);
  }
};
export type RuleTaskAction =
  | { type: "set_ticket_class"; ticketClass: TicketClassType[] }
  | { type: "modify_rules"; id: string };

export default TicketClassTypeProvider;
