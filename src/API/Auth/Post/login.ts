// 1. 네비게이트 관련
// 2. 토큰교체
// 3. 블로그 데이터 ( 전체, 카테고리별 나눠져있는데 어떻게 예외처리를 해야하는지 )
// 4. 그 외 부자연스러운 액션들 및 page 증가로직
// 5. 이미지 업로드

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
    await baseInstance
      .post<LoginResponseType>("/login", request)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("memberId", `${res.data.memberId}`);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          params.navigate("/");
        }
      });
  } catch (err: any) {
    console.log(err);
    if (err.response.status === 401) {
      alert("로그인 정보가 잘못 되었습니다!");
    }
  }
}
