import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

export const baseInstance = axios.create({
  baseURL: process.env.REACT_APP_DB_HOST,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const tokenInstance = axios.create({
  baseURL: process.env.REACT_APP_DB_HOST,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: accessToken,
  },
});

tokenInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
      const res = await axios.post("/reissue", "", {
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
