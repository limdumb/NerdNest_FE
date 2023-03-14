import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { baseInstance } from "../../Instance/Instance";

interface Params {
  navigate: NavigateFunction;
}

export const kakaoOauth = async (params: Params) => {
  try {
    await axios.get(
      "https://kauth.kakao.com/oauth/authorize?client_id=5afa29777ac5c75b6cd7d7eaacd0f5b6&redirect_uri=http://ec2-15-164-185-150.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/code/kakao&response_type=code"
    ).then((res)=>{
      console.log(res.headers.location)
    })
    await axios.post("/oauth2/authorization/kakao").then((res) => {
      if (res.status === 200) {
        localStorage.setItem("memberId", `${res.data.memberId}`);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        params.navigate("/");
        window.location.reload();
      }
    });
  } catch (err) {
    console.log(err);
  }
};
