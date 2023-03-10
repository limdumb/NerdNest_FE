import { baseInstance } from "../../Instance/Instance";
import { useNavigate } from "react-router-dom";

export interface Params {
  titleImageUrl: string;
  blogTitle: string;
  blogContent: string;
  categoryId: number | null;
  memberId: number;
  blogId: number;
  nickName: string;
}

export default async function postBlog(params: Params) {
  const navigate = useNavigate();

  if (params.categoryId === 0) {
    params.categoryId = null;
  }

  const request = {
    titleImageUrl: params.titleImageUrl,
    blogTitle: params.blogTitle,
    blogContent: params.blogContent,
    categoryId: params.categoryId,
  };
  
  try {
    //추후 로직 변경 예정
    await baseInstance
      .post(`/blogs/${params.memberId}`, request)
      .then((res) => {
        if (res.status === 201) {
          alert("게시물 작성이 완료 되었습니다");
          navigate(
            `/${params.nickName}/${params.memberId}/${params.blogTitle}/${params.blogId}`
          );
        }
      });
  } catch (err) {
    console.error(err);
  }
}
