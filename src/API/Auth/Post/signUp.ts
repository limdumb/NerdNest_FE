import login from "./login";
import { baseInstance } from "../../Instance/Instance";
import { NavigateFunction } from "react-router-dom";

interface Params {
  email: string;
  nickName: string;
  password: string;
  navigate: NavigateFunction;
}

export default async function signUp(params: Params) {
  const request = {
    email: params.email,
    nickName: params.nickName,
    password: params.password,
  };
  try {
    await baseInstance.post("/signup", request).then((res) => {
      if (res.status === 201) {
        alert("회원가입이 완료 되었습니다!");
        login({
          email: params.email,
          password: params.password,
          navigate: params.navigate,
        });
      }
    });
  } catch (err) {
    if (err) {
      alert("정보가 잘못 되었습니다!");
    }
  }
}
