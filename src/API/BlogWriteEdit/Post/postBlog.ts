import { tokenInstance } from "../../Instance/Instance";

export interface Params {
  blogTitle: string;
  blogContent: string;
  categoryId: number | null;
  titleImageUrl: string;
}

export default async function postBlog(params: Params) {
  const request = {
    titleImageUrl: params.titleImageUrl,
    blogTitle: params.blogTitle,
    blogContent: params.blogContent,
    categoryId: params.categoryId,
  };

  try {
    const response = await tokenInstance.post(`/blogs`, request);
    if (response.status === 201) {
      alert("게시물 작성이 완료 되었습니다");
      return response.data.blogId;
    }
  } catch (err) {
    console.error(err);
  }
}
