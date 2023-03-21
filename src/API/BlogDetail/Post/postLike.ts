import { tokenInstance } from "../../Instance/Instance";

export default function postLike(blogId: number, accessToken: string | null) {
  if (accessToken) {
    tokenInstance
      .post(`/blogs/${blogId}/likes`)
      .then((res) =>
        res.data.likeStatus === "LIKE"
          ? alert("내 추천에 추가되었습니다.")
          : alert("내 추천에서 삭제되었습니다.")
      )
      .catch((err) => console.error(err));
  } else {
    alert("로그인 후 사용해주세요.");
  }
}