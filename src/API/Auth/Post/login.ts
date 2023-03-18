import { baseInstance } from "../../Instance/Instance";

interface Params {
  email: string;
  password: string;
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
  try {
    const result = await baseInstance
      .post<LoginResponseType>("/login", request)
      if(result.status === 200){
        localStorage.setItem("memberId", `${result.data.memberId}`);
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
      }
      return result.status
  } catch (err: any) {
    if (err.response.data.status === 401) {
      alert("로그인 정보가 잘못 되었습니다!");
    }
    console.log(err);
  }
}
