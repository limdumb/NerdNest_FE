import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

export const baseInstance = axios.create({
  baseURL: "http://15.164.185.150:8080",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const tokenInstance = axios.create({
  baseURL: "http://15.164.185.150:8080",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: accessToken,
  },
});

tokenInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.data.message === "Refresh Token Expiration") {
      alert(
        "로그인 기간이 만료 되었습니다! 서비스 이용을 위해 재로그인 부탁 드립니다."
      );
      window.localStorage.clear();
      window.location.replace("/");
    }
    if (error.response.data.message === "Access Token Expiration") {
      const res = await axios.post("http://15.164.185.150:8080/reissue", "", {
        headers: {
          Refresh: refreshToken,
        },
      });
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("memberId", res.data.memberId);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
