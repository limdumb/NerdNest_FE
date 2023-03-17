import { tokenInstance } from "../../Instance/Instance";

interface PostCommentContentProps {
  blogId: number | undefined;
  parentId: number | null;
  commentContent: string | null;
}

export default function postComment(
  content: PostCommentContentProps,
  accessToken: string | null
) {
  if (accessToken) {
    tokenInstance
      .post(`/comments`, content)
      .then((res) => {
        if (res.status === 201) {
          alert("작성이 완료되었습니다.");
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  } else {
    alert("로그인 후 사용해주세요.");
  }
}
