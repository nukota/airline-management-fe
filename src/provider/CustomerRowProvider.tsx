import { Customer } from "@/interfaces/type";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useReducer,
} from "react";

const CustomerRowContext = createContext<Customer | null>(null);
const CustomerRowDispatchContext =
  createContext<React.Dispatch<CustomerRowAction> | null>(null);

type CustomerRowProviderProps = {
  children: ReactNode;
  customer: Customer;
};

export const CustomerRowProvider = ({
  children,
  customer,
}: CustomerRowProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(bookingReducer, customer);

  return (
    <CustomerRowContext.Provider value={state}>
      <CustomerRowDispatchContext.Provider value={dispatch}>
        {children}
      </CustomerRowDispatchContext.Provider>
    </CustomerRowContext.Provider>
  );
};
export function useCustomerRow() {
  const context = useContext(CustomerRowContext);
  if (context === null) {
    throw new Error("useCustomerRow must be used within a CustomerRowProvider");
  }
  return context;
}
export function useCustomerRowDispatch() {
  const context = useContext(CustomerRowDispatchContext);
  if (context === null) {
    throw new Error(
      "useCustomerRowDispatch must be used within a CustomerRowProvider"
    );
  }
  return context;
}

type CustomerRowAction = { type: "DELETE_CUSTOMER"; token: string; id: string };

const bookingReducer = (
  state: Customer,
  action: CustomerRowAction
): Customer => {
  switch (action.type) {
    default:
      return state;
  }
};
