import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
} from "react";

// Define types
type ApiState = {
  data: any;
  loading: boolean;
  error: string | null;
};

type ApiAction =
  | { type: "REQUEST" }
  | { type: "SUCCESS"; payload: any }
  | { type: "ERROR"; payload: string };

type ApiDispatch = (action: ApiAction) => void;

// Create context
const ApiStateContext = createContext<ApiState | undefined>(undefined);
const ApiDispatchContext = createContext<ApiDispatch | undefined>(undefined);

// Reducer
function apiReducer(state: ApiState, action: ApiAction): ApiState {
  switch (action.type) {
    case "REQUEST":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Provider component
export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(apiReducer, {
    data: null,
    loading: false,
    error: null,
  });

  return (
    <ApiStateContext.Provider value={state}>
      <ApiDispatchContext.Provider value={dispatch}>
        {children}
      </ApiDispatchContext.Provider>
    </ApiStateContext.Provider>
  );
};

// Custom hook
export const useApi = () => {
  const state = useContext(ApiStateContext);
  const dispatch = useContext(ApiDispatchContext);

  if (state === undefined || dispatch === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }

  const apiCall = useMemo(
    () =>
      async (
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE",
        body?: any
      ) => {
        dispatch({ type: "REQUEST" });
        try {
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
          });
          const data = await response.json();
          dispatch({ type: "SUCCESS", payload: data });
          return data;
        } catch (error: any) {
          dispatch({ type: "ERROR", payload: error.message });
          throw error;
        }
      },
    [dispatch]
  );

  return { ...state, apiCall };
};
