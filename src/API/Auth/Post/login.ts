import { NavigateFunction } from "react-router-dom";
import { baseInstance } from "../../Instance/Instance";

interface Params {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

interface LoginResponseType {
  memberId: number;
  accessToken: string;
  refreshToken: string;
}

export default async function login(params: Params) {
  const request = {
    email: params.email,
    password: params.password,
  };

  await baseInstance.post<LoginResponseType>("/login", request).then((res) => {
    if (res.status === 200) {
      localStorage.setItem("memberId", `${res.data.memberId}`);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      params.navigate("/");
      window.location.reload();
    }
  });
  try {
    // err 타입 핸들링 공부 예정
  } catch (err: any) {
    if (err.response.status === 401) {
      alert("로그인 정보가 잘못 되었습니다!");
    }
  }
}
