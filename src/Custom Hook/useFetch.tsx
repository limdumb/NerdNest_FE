import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface State<T> {
  loading: boolean;
  error: any;
  data: T | null;
}

export default function useFetch<T>(endPoint: string) {
  const baseUrl: string = "http://15.164.185.150:8080" + endPoint;
  const [data, setData] = useState<State<T>>({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    axios.get(baseUrl)
      .then((response: AxiosResponse<T>) => {
        setData({ loading: false, error: null, data: response.data });
      })
      .catch((error: any) => {
        setData({ loading: false, error, data: null });
      });
  }, [endPoint]);
  return data
}
