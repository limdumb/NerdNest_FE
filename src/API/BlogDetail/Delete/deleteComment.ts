import { tokenInstance } from "../../Instance/Instance";

export default function deleteComment(commentId: number) {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    tokenInstance
      .delete(`/comments/${commentId}`)
      .then((res) => {
        if (res.status === 204) {
          alert("삭제가 완료되었습니다.");
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  }
}