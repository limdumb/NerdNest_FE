import { tokenInstance } from "../../Instance/Instance";

export default function deleteBlogPost(blogId: string | undefined) {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    tokenInstance
      .delete(`/blogs/${blogId}`)
      .then(() => {
        alert("삭제가 완료되었습니다.");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  }
}
