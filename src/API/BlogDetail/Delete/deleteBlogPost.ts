import { baseInstance } from "../../Instance/Instance";

export default function deleteBlogPost(
  blogId: number,
  accessToken: string | null
) {
  baseInstance.defaults.headers.common["Authorization"] = accessToken;
  baseInstance
    .delete(`/blogs/${blogId}`)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
