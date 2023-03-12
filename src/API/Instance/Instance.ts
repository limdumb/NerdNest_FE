import axios from "axios";

export const baseInstance = axios.create({
  baseURL: "http://15.164.185.150:8080",
  timeout: 1000,
});