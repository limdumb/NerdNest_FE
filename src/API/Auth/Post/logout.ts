//토큰필요
import { baseInstance } from "../../Instance/Instance";
export default async function logout(accessToken: string) {
  baseInstance.defaults.headers.common["Authorization"] = accessToken;
  try {
    await baseInstance
      .post("/logout")
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('memberId')
          alert("로그아웃이 완료 되었습니다 🙆🏻");
          window.location.reload()
        }
      });
  } catch (err) {
    console.error(err);
  }
}