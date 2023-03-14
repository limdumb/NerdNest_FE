import { tokenInstance } from "../../Instance/Instance";

export default function deleteBlogPost(
  blogId: number,
) {
  tokenInstance
    .delete(`/blogs/${blogId}`)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
