import { AirportType } from "@/interfaces/type";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useReducer,
} from "react";

const AirportRowContext = createContext<AirportType | null>(null);
const AirportRowDispatchContext =
  createContext<React.Dispatch<AirportRowAction> | null>(null);

type AirportRowProviderProps = {
  children: ReactNode;
  airport: AirportType;
};

export const AirportRowProvider = ({
  children,
  airport,
}: AirportRowProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(airportReducer, airport);

  return (
    <AirportRowContext.Provider value={state}>
      <AirportRowDispatchContext.Provider value={dispatch}>
        {children}
      </AirportRowDispatchContext.Provider>
    </AirportRowContext.Provider>
  );
};
export function useAirportRow() {
  const context = useContext(AirportRowContext);
  if (context === null) {
    throw new Error("useAirportRow must be used within a AirportRowProvider");
  }
  return context;
}
export function useAirportRowDispatch() {
  const context = useContext(AirportRowDispatchContext);
  if (context === null) {
    throw new Error(
      "useAirportRowDispatch must be used within a AirportRowProvider"
    );
  }
  return context;
}

type AirportRowAction = { type: "DELETE_CUSTOMER"; token: string; id: string };

const airportReducer = (
  state: AirportType,
  action: AirportRowAction
): AirportType => {
  switch (action.type) {
    default:
      return state;
  }
};
