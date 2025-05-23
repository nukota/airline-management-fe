"use client";
import { DataFetchType, Customer } from "@/interfaces/type";
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

const CustomersContext = createContext<CustomerState | null>(null);
const CustomersDispatchContext =
  createContext<React.Dispatch<CustomerTaskAction> | null>(null);
const CustomerRefreshContext = createContext<(() => void) | null>(null);
const OriginalCustomersContext = createContext<CustomerState | null>(null);

export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER}/customer`;
  let { data, refetch } = useApi<DataFetchType<Customer>>(url, "GET");

  const initialState: CustomerState = [];
  const [tickets, dispatch] = useReducer(tasksReducer, initialState);

  const [originalCustomers, setOriginalCustomers] = useState<CustomerState>([]);

  useEffect(() => {
    if (data?.data) {
      const sortData = sortByDateDesc(data?.data, "creatAt");
      setOriginalCustomers(sortData);
      dispatch({ type: "set_customers", data: sortData });
    }
  }, [data]);

  const refreshCustomers = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <OriginalCustomersContext.Provider value={originalCustomers}>
      <CustomersContext.Provider value={tickets}>
        <CustomersDispatchContext.Provider value={dispatch}>
          <CustomerRefreshContext.Provider value={refreshCustomers}>
            {children}
          </CustomerRefreshContext.Provider>
        </CustomersDispatchContext.Provider>
      </CustomersContext.Provider>
    </OriginalCustomersContext.Provider>
  );
};

export function useCustomers() {
  const context = useContext(CustomersContext);
  if (context === null) {
    throw new Error("useCustomers must be used within a CustomersProvider");
  }
  return context;
}

export function useCustomersDispatch() {
  const context = useContext(CustomersDispatchContext);
  if (context === null) {
    throw new Error(
      "useCustomersDispatch must be used within a CustomersProvider"
    );
  }
  return context;
}
export function useOriginalCustomers() {
  const context = useContext(OriginalCustomersContext);
  if (context === null) {
    throw new Error(
      "useCustomersDispatch must be used within a CustomersProvider"
    );
  }
  return context;
}
export function useRefreshCustomers() {
  const context = useContext(CustomerRefreshContext);
  if (context === null) {
    throw new Error(
      "useRefreshCustomers must be used within a BookingProvider"
    );
  }
  return context;
}
const tasksReducer = (
  state: CustomerState,
  action: CustomerTaskAction
): CustomerState => {
  switch (action.type) {
    case "set_customers":
      return action.data;
    case "delete_customer":
      return state.filter(
        (customer) => customer.customerId !== action.customerId
      );
    case "filter_customers":
      return action.origin.filter((customer) => {
        const { username, countryCode, emailValidated } = action.query;
        const matchesName = username
          ? customer.fullname.toLowerCase().includes(username.toLowerCase())
          : true;
        const matchesValidateEmail = emailValidated
          ? customer.emailValidated === emailValidated
          : true;
        const matchesCountry = countryCode
          ? customer.nationality
              .toLowerCase()
              .includes(countryCode.toLowerCase())
          : true;
        return matchesName && matchesValidateEmail && matchesCountry;
      });
    default:
      throw new Error(`Unhandled action type: `);
  }
};

type CustomerState = Customer[];

export type CustomerTaskAction =
  | { type: "set_customers"; data: CustomerState }
  | { type: "delete_customer"; customerId: string }
  | {
      type: "filter_customers";
      origin: CustomerState;
      query: {
        username?: string;
        countryCode?: string;
        emailValidated?: boolean | null;
      };
    }
  | { type: "change_role"; customerId: string; data: any };

export default CustomersProvider;
