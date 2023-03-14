export const KakaoOauthButton = () => {
  return (
    <>
      <button
        className="KaKao_Oauth_Button"
        onClick={() => {
          window.open(
            "/oauth/kakao/login",
            `authForm`,
            "width=570, height=350"
          );
          // window.open(Kakao_Auth_Url, `authForm`, "width=570, height=350");
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
