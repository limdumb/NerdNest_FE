import axios from "axios";
import login from "./login";

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
    await axios.post("url", request).then((res) => {
      if (res.status === 200) {
        login({ email: params.email, password: params.password });
      }
    });
  } catch (err) {
    if (err) {
      alert("정보가 잘못 되었습니다!");
    }
  }
}
