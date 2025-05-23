"use client";
import { DataFetchType, Rules } from "@/interfaces/type";
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
import { rulesEndpoint } from "@/services/axios/endpoints/rules.endpoint";

const RulesContext = createContext<Rules | null>(null);
const RulesDispatchContext =
  createContext<React.Dispatch<RuleTaskAction> | null>(null);
const RuleRefreshContext = createContext<(() => void) | null>(null);
const OriginalRulesContext = createContext<Rules | null>(null);

export const RulesProvider = ({ children }: { children: ReactNode }) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER}${rulesEndpoint["get-rules"]}`;
  let { data, refetch } = useApi<Rules>(url, "GET");

  const initialState: Rules = {
    airportRules: {
      minFlightDuration: 0,
      maxIntermediateAirport: 0,
      minIntermediateAirportStopDelay: 0,
      maxIntermediateAirportStopDelay: 0,
    },
    bookingRules: {
      minBookingTime: 0,
      minCancelBookingTime: 0,
    },
  };
  const [rules, dispatch] = useReducer(tasksReducer, initialState);

  const [originalRules, setOriginalRules] = useState<Rules | null>(null);

  useEffect(() => {
    if (data) {
      setOriginalRules(data);
      dispatch({ type: "set_rules", tasks: data });
    }
  }, [data]);

  const refreshRules = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <OriginalRulesContext.Provider value={originalRules}>
      <RulesContext.Provider value={rules}>
        <RulesDispatchContext.Provider value={dispatch}>
          <RuleRefreshContext.Provider value={refreshRules}>
            {children}
          </RuleRefreshContext.Provider>
        </RulesDispatchContext.Provider>
      </RulesContext.Provider>
    </OriginalRulesContext.Provider>
  );
};

export function useRules() {
  const context = useContext(RulesContext);
  if (context === null) {
    throw new Error("useRules must be used within a RulesProvider");
  }
  return context;
}

export function useRulesDispatch() {
  const context = useContext(RulesDispatchContext);
  if (context === null) {
    throw new Error("useRulesDispatch must be used within a RulesProvider");
  }
  return context;
}
export function useOriginalRules() {
  const context = useContext(OriginalRulesContext);
  if (context === null) {
    throw new Error("useRulesDispatch must be used within a RulesProvider");
  }
  return context;
}
export function useRefreshRules() {
  const context = useContext(RuleRefreshContext);
  if (context === null) {
    throw new Error("useRefreshRules must be used within a BookingProvider");
  }
  return context;
}

const tasksReducer = (state: Rules, action: RuleTaskAction): Rules => {
  switch (action.type) {
    case "set_rules":
      return action.tasks;
    default:
      throw new Error(`Unhandled action type: `);
  }
};
export type RuleTaskAction =
  | { type: "set_rules"; tasks: Rules }
  | { type: "modify_rules"; id: string };

export default RulesProvider;
