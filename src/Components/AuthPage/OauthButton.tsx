import { useNavigate } from "react-router-dom";

export const KakaoOauthButton = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL as string;
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
    window.location.href = process.env.REACT_APP_GOOGLE_URL as string;
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
