import { baseInstance } from "../../Instance/Instance";

export default function deleteComment(
  commentId: number,
  accessToken: string | null
) {
  baseInstance.defaults.headers.common["Authorization"] = accessToken;
  baseInstance
    .delete(`/comments/${commentId}`)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
