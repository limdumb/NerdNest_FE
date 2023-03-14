import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

interface KakaoOAuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

export default function OauthPage() {
  const Client_Secrit = "vwjdyiRlVjgnwN246cYGo03x1Mx0lmh0";
  const Rest_API_Key = "5afa29777ac5c75b6cd7d7eaacd0f5b6";
  const Redirect_Uri = "http://localhost:3000";
  const Kakao_Auth_Url = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_API_Key}&redirect_uri=${Redirect_Uri}&response_type=code`;
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = Kakao_Auth_Url;
  }, []);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      axios
        .post(
          "https://kauth.kakao.com/oauth/token",
          qs.stringify({
            grant_type: "authorization_code",
            client_id: Rest_API_Key,
            redirect_uri: Redirect_Uri,
            code: code,
            client_secret: Client_Secrit,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        )
        .then((res) => {
          axios
            .post("http://15.164.185.150:8080/login/oauth2/code/kakao", {
              Authorization: res.data.id_token,
            })
            .then((res) => {
              localStorage.setItem("memberId", res.data.memberId);
              localStorage.setItem("accessToken", res.data.accessToken);
              localStorage.setItem("refreshToken", res.data.refreshToken);
              navigate("/")
            });
        })
        .catch((error) => {
          console.error("Failed to exchange auth code for access token", error);
        });
    }
  }, []);

  return <div>loading...</div>;
}
