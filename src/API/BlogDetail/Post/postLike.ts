import { tokenInstance } from "../../Instance/Instance";

export default function postLike(blogId: number, accessToken: string | null) {
  tokenInstance
    .post(`/blogs/${blogId}/likes`)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
