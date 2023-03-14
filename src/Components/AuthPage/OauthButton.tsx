import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoOauth } from "../../API/Auth/Post/oauth";
interface KakaoOAuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

export const KakaoOauthButton = () => {
  const Rest_API_Key = "d0e3b7b12ae61129c2c343e2a9579de0";
  const Redirect_Uri = "http://localhost:3000";
  const Kakao_Auth_Url = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_API_Key}&redirect_uri=${Redirect_Uri}&response_type=code`;
  const navigate = useNavigate();
  const [test, setTest] = useState<KakaoOAuthResponse>();

  useEffect(() => {
    axios
      .get<KakaoOAuthResponse>(Kakao_Auth_Url, {
        params: {
          code: new URLSearchParams(window.location.search).get("code"),
        },
      })
      .then(async (res) => {
        setTest(res.data);
        const request = {
          grant_type: "authorization_code",
          client_id: Rest_API_Key,
          redirect_uri: Redirect_Uri,
          code: res.data,
        };
        await axios
          .post("kauth.kakao.com/oauth/token", qs.stringify(request), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((res) => {});
      })
      .catch((error) => {
        console.error("Failed to exchange auth code for access token", error);
      });
  }, []);

  return (
    <>
      <button
        className="KaKao_Oauth_Button"
        onClick={() => {
          window.open(Kakao_Auth_Url, `authForm`, "width=570, height=350");
          console.log(test);
        }}
      >
        K
      </button>
    </>
  );
};

export const GoogleOauthButton = () => {
  return (
    <>
      <button className="Google_Oauth_Button">
        <img
          src={
            "https://accounts.scdn.co/sso/images/google-icon.1cdc8fce9609d07f0e9d8d0bc4b61f8f.svg"
          }
        />
      </button>
    </>
  );
};
