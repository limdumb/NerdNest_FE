import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { baseInstance } from "../API/Instance/Instance";

interface State<T> {
  loading: boolean;
  error: any;
  data: T;
}

export default function useFetch<T>(endPoint: string, initialValue: T) {
  const [fetchData, setFetchData] = useState<State<T>>({
    loading: true,
    error: null,
    data: initialValue,
  });

  useEffect(() => {
    baseInstance
      .get(endPoint)
      .then((response: AxiosResponse<T>) => {
        setFetchData({ loading: false, error: null, data: response.data });
      })
      .catch((error: any) => {
        setFetchData({ loading: false, error, data: initialValue });
      });
  }, [endPoint]);
  return fetchData;
}
