import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseInstance } from "../API/Instance/Instance";

export default function GoogleOauthPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    baseInstance.get(`/oauth?email=${email}`).then((res) => {
      localStorage.setItem("memberId", res.data.memberId);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      navigate("/");
      window.location.reload()
    });
  }, []);
  return <div>loading...</div>;
}
