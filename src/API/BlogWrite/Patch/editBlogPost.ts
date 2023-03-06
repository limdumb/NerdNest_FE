import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Params } from "../Post/postBlog";

export default function editBlogPost(params:Params) {
  const navigate = useNavigate()
  const request = JSON.stringify({
    titleImageUrl: params.titleImageUrl,
    blogTitle: params.blogTitle,
    blogContent: params.blogContent,
    categoryId: params.categoryId,
  });
  try {
    //추후 로직 변경 예정
    axios.patch("url", request).then((res)=>{
      if(res.status === 201){
        alert("게시물 작성이 완료 되었습니다")
        //상의 후 해당 게시물로 가도록 설정할 예정
        navigate(-1)
      }
    })
  } catch (err) {
    console.error(err);
  }
}
