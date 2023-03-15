import axios from "axios";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const handleCallback = async () => {
    setLoading(true);

    try {
      // 현재 URL에서 인가코드 추출
      const authorizationCode = new URLSearchParams(window.location.search).get(
        "code"
      );

      await axios.post("http://15.164.185.150:8080/login/oauth2/code/kakao", {
        code: authorizationCode,
      });

      // // 액세스 토큰을 쿠키나 로컬 스토리지에 저장
      // const accessToken = response.data.accessToken;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  handleCallback();
  return <div>loading...</div>;
}
