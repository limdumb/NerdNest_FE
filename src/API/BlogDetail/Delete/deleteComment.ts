import { tokenInstance } from "../../Instance/Instance";

export default function deleteComment(
  commentId: number,
) {
  tokenInstance
    .delete(`/comments/${commentId}`)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
