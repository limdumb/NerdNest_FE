import { tokenInstance } from "../../Instance/Instance";
import { Params } from "../Post/postBlog";

interface EditParams extends Params {
  blogId: number;
}

export default async function editBlogPost(params: EditParams) {
  const request = {
    blogId: params.blogId,
    blogTitle: params.blogTitle,
    blogContent: params.blogContent,
    categoryId: params.categoryId,
    titleImageUrl: params.titleImageUrl,
  };
  try {
    const response = await tokenInstance.patch(
      `blogs/edit/${params.blogId}`,
      request
    );
    if (response.status === 200) alert("수정이 완료 되었습니다!");
  } catch (err) {
    console.error(err);
  }
}