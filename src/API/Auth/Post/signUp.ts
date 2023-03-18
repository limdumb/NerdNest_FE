import login from "./login";
import { baseInstance } from "../../Instance/Instance";
import { NavigateFunction } from "react-router-dom";

interface Params {
  email: string;
  nickName: string;
  password: string;
}

export default async function signUp(params: Params) {
  const request = {
    email: params.email,
    nickName: params.nickName,
    password: params.password,
  };
  try {
    const result = await baseInstance.post("/signup", request)
      if (result.status === 201) {
        alert("회원가입이 완료 되었습니다!");
    };
    return result.status
  } catch (err: any) {
    console.error(err)
    if(err.response.status === 409) alert("중복된 이메일 입니다")
  }
}
