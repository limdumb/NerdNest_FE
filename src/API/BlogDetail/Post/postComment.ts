import { baseInstance } from "../../Instance/Instance";

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
    baseInstance.defaults.headers.common["Authorization"] = accessToken;
    baseInstance
      .post(`/comments`, content)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  } else {
    alert("로그인 후 사용해주세요.");
  }
}
