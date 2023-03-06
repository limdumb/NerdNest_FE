//Authorization 토큰 필요
import axios from "axios";
import { useNavigate } from "react-router-dom";
export interface Params {
  titleImageUrl: string;
  blogTitle: string;
  blogContent: string;
  categoryId: number | null;
}

export default function postBlog(params: Params) {
  const navigate = useNavigate();

  if (params.categoryId === 0) {
    params.categoryId = null;
  }

  const request = JSON.stringify({
    titleImageUrl: params.titleImageUrl,
    blogTitle: params.blogTitle,
    blogContent: params.blogContent,
    categoryId: params.categoryId,
  });
  try {
    //추후 로직 변경 예정
    axios.post("url", request).then((res) => {
      if (res.status === 201) {
        alert("게시물 작성이 완료 되었습니다");
        //상의 후 해당 게시물로 가도록 설정할 예정
        navigate(-1);
      }
    });
  } catch (err) {
    console.error(err);
  }
}
