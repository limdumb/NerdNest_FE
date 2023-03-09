import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { baseInstance } from "../API/Instance/Instance";

interface State<T> {
  loading: boolean;
  error: any;
  data: T;
}

export default function useFetch<T>(endPoint: string, initialValue: T) {
  //추후 env로 변경 가능성 있음
  const [data, setData] = useState<State<T>>({
    loading: true,
    error: null,
    data: initialValue,
  });

  useEffect(() => {
    //추후 토큰에 관련된 부분도 넣어서 변경예정
    baseInstance
      .get(endPoint)
      .then((response: AxiosResponse<T>) => {
        setData({ loading: false, error: null, data: response.data });
      })
      .catch((error: any) => {
        setData({ loading: false, error, data: initialValue });
      });
  }, [endPoint]);
  return data;
}
