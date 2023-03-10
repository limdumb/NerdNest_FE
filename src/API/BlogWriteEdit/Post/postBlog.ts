import { baseInstance } from "../../Instance/Instance";
import { NavigateFunction } from "react-router-dom";

export interface Params {
  blogTitle: string;
  blogContent: string;
  categoryId: number | null;
  memberId: number;
  navigate: NavigateFunction;
  accessToken: string | null
}

export default async function postBlog(params: Params) {
  baseInstance.defaults.headers.common["Authorization"] = params.accessToken;
  const request = {
    blogTitle: params.blogTitle,
    blogContent: params.blogContent,
    categoryId: params.categoryId,
  };

  try {
    await baseInstance
      .post(`/blogs/${params.memberId}`, request)
      .then((res) => {
        if (res.status === 201) {
          alert("게시물 작성이 완료 되었습니다");
          params.navigate(
            //백엔드와 상의 후 로직수정 예정
            // `/${res.data.nickName}/${params.memberId}/${params.blogTitle}/${res.data.blogId}`
            `/${"임덤덤"}/${params.memberId}/${params.blogTitle}/${1}`
          );
        }
      });
  } catch (err) {
    console.error(err);
  }
}
