import { useState } from "react";

export const KakaoOauthButton = () => {
  const [loading, setLoading] = useState(false);

  const handleKakaoLogin = async () => {
    setLoading(true);

    try {
      // 카카오 로그인 화면으로 이동하는 URL 생성
      const redirectUri = encodeURIComponent(
        "http://15.164.185.150:8080/login/oauth2/code/kakao"
      ); // 백엔드 서버 주소를 입력
      const clientId = "5afa29777ac5c75b6cd7d7eaacd0f5b6";
      const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

      // 카카오 로그인 화면으로 이동
      window.open(url, `authForm`, "width=500, height=700");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="KaKao_Oauth_Button"
        onClick={handleKakaoLogin}
        disabled={loading}
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
