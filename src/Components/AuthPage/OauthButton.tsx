import { useState } from "react";

export const KakaoOauthButton = () => {
  const handleKakaoLogin = async () => {
    const url = "http://15.164.185.150:8080/oauth2/authorization/kakao";
    window.location.href = url;
    // window.open(url, `authForm`, "width=500, height=700");
  };

  return (
    <>
      <button className="KaKao_Oauth_Button" onClick={handleKakaoLogin}>
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
