import { baseInstance } from "../../Instance/Instance";

export interface Params {
  blogTitle: string;
  blogContent: string;
  categoryId: number | null;
  accessToken: string | null;
  titleImageUrl: string;
}

export default async function postBlog(params: Params) {
  baseInstance.defaults.headers.common["Authorization"] = params.accessToken;
  const request = {
    titleImageUrl: params.titleImageUrl,
    blogTitle: params.blogTitle,
    blogContent: params.blogContent,
    categoryId: params.categoryId,
  };

  try {
    await baseInstance.post(`/blogs`, request).then((res) => {
      if (res.status === 201) {
        alert("게시물 작성이 완료 되었습니다");
      }
    });
  } catch (err) {
    console.error(err);
  }
}
