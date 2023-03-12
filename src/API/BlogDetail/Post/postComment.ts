import { baseInstance } from "../../Instance/Instance";

export default function postComment(
  url: string,
  content: string,
  accessToken: string
) {
  baseInstance.defaults.headers.common["Authorization"] = accessToken;
  baseInstance
    .post(url, content)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
