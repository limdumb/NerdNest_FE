import { baseInstance } from "../../Instance/Instance";

interface PostCommentContentProps {
  blogId: number | undefined;
  commentContent: string | null;
}

export default function postComment(
  content: PostCommentContentProps,
  accessToken: string | null
) {
  baseInstance.defaults.headers.common["Authorization"] = accessToken;
  baseInstance
    .post(`/comments`, content)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
