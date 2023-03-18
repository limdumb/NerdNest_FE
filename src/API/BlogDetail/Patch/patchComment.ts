import { tokenInstance } from "../../Instance/Instance";

export default function patchComment(commentId: number, comment: string) {
  tokenInstance
    .patch(`/comments/${commentId}`, { commentContent: comment })
    .then((res) => {
      if (res.status === 200) {
        alert("수정이 완료되었습니다.");
        window.location.reload();
      }
    })
    .catch((err) => console.error(err));
}
