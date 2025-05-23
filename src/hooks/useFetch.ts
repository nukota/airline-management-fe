// /hooks/useFetch.ts
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: session?.user.token,
      },
    };
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.request(config);
        const result = response.data;
        setData(result);
      } catch (err: any) {
        if (err.response) setError(err.response.data.message);
        else setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, session?.user.token]);

  return { data, loading, error };
}

export default useFetch;
