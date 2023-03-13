import { baseInstance } from "../../Instance/Instance";

export default function postLike(blogId: number, accessToken: string | null) {
  baseInstance.defaults.headers.common["Authorization"] = accessToken;
  baseInstance
    .post(`/blogs/${blogId}/likes`)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
