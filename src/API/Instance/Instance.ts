import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
const refrashToken = localStorage.getItem("refreshToken");

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

baseInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.data.message === "Access Token Expiration") {
      const originalRequest = error.config;
      const res = await axios.post("http://15.164.185.150:8080/reissue", "",{
        headers: {
          Refresh: refrashToken,
        }
      });
      if (res.status === 200) {
        const newAccessToken = res.data.accessToken;
        baseInstance.defaults.headers.common["Authorization"] = newAccessToken;
        originalRequest.headers["Authorization"] = newAccessToken;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("memberId", res.data.memberId);
        localStorage.setItem("refrashToken", res.data.refrashToken);
        return axios(originalRequest); // 반환된 처리를 다시진행하게 만드는것
      }
    }
    return Promise.reject(error);
  }
);

// originalRequest._retry는 다시 요청을 했는지 확인하는것 하지만 사용하지 않은 이유는
// 백앤드에서 토큰 만료에 대한 확실한 메세지값을 주었기 떄문에 따로 더블체크는 하지않을예정

tokenInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.data.message === "Access Token Expiration") {
      const originalRequest = error.config;
      const res = await axios.post("http://15.164.185.150:8080/reissue", "", {
        headers: {
          Refresh: refrashToken,
        }
      });
      if (res.status === 200) {
        const newAccessToken = res.data.accessToken;
        baseInstance.defaults.headers.common["Authorization"] = newAccessToken;
        originalRequest.headers["Authorization"] = newAccessToken;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("memberId", res.data.memberId);
        localStorage.setItem("refrashToken", res.data.refrashToken);
        return axios(originalRequest); // 반환된 처리를 다시진행하게 만드는것
      }
    }
    return Promise.reject(error);
  }
);
