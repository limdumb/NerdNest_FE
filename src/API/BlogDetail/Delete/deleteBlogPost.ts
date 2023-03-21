import { tokenInstance } from "../../Instance/Instance";

export default function deleteBlogPost(blogId: number) {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    tokenInstance
      .delete(`/blogs/${blogId}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }
}