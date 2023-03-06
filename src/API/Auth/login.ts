import axios from "axios";
import { useNavigate } from "react-router-dom";
interface Params {
  email: string;
  password: string;
}

interface LoginResponseType{
  memberId: number
  accessToken: string
  refreshToken: string
}

export default function login(params: Params) {
  const navigate = useNavigate()
  const request = JSON.stringify({
    email: params.email,
    password: params.password,
  });
  
  axios.post("url", request).then((res)=>{
    localStorage.setItem("memberId", res.data.memberId)
    localStorage.setItem("accessToken", res.data.accessToken)
    localStorage.setItem("refreshToken", res.data.refreshToken)
    navigate("/")
  })
  try {
  } catch (err) {
    console.error(err);
  }
}
