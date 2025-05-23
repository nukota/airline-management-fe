import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useSession } from "next-auth/react";

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  refetch: () => void;
}

function useApi<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: AxiosRequestConfig
): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [trigger, setTrigger] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response: AxiosResponse<T> = await axios.request({
          method,
          url,
          headers: { Authorization: session?.user?.token },
          ...options,
        });

        setData(response.data);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, options, trigger, session?.user.token]);

  const refetch = () => {
    console.log("useApi");
    setTrigger(!trigger);
  };

  return { data, loading, error, refetch };
}

export default useApi;
