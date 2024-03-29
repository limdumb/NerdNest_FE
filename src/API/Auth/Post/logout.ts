import { tokenInstance } from "../../Instance/Instance";

export default async function logout() {
  try {
    await tokenInstance.post("/logout").then((res) => {
      if (res.status === 200) {
        window.localStorage.clear();
        alert("로그아웃이 완료 되었습니다 🙆🏻");
        window.location.reload();
      }
    });
  } catch (err) {
    console.error(err);
  }
}