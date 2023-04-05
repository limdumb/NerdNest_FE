import { useNavigate } from "react-router-dom";

export const KakaoOauthButton = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    const kakaoLoginUrl =
      "http://15.164.185.150:8080/oauth2/authorization/kakao";
    window.location.href = kakaoLoginUrl;
  };

  return (
    <>
      <button
        className="KaKao_Oauth_Button"
        onClick={() => {
          handleKakaoLogin();
          navigate("/oauth/kakao/login");
        }}
      >
        K
      </button>
    </>
  );
};

export const GoogleOauthButton = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    const googleLoginUrl =
      "http://ec2-15-164-185-150.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google";
    window.location.href = googleLoginUrl;
  };
  return (
    <>
      <button
        className="Google_Oauth_Button"
        onClick={() => {
          handleGoogleLogin();
          navigate("/oauth/google/login");
        }}
      >
        <img
          src={
            "https://accounts.scdn.co/sso/images/google-icon.1cdc8fce9609d07f0e9d8d0bc4b61f8f.svg"
          }
        />
      </button>
    </>
  );
};
