import { tokenInstance } from "../../Instance/Instance";

export default function postLike(blogId: number, accessToken: string | null) {
  if (accessToken) {
    tokenInstance
      .post(`/blogs/${blogId}/likes`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  } else {
    alert("로그인 후 사용해주세요.");
  }
}
