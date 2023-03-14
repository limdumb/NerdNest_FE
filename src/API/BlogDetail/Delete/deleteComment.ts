import { tokenInstance } from "../../Instance/Instance";

export default function deleteComment(
  commentId: number,
  accessToken: string | null
) {
  tokenInstance
    .delete(`/comments/${commentId}`)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
