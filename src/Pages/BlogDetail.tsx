import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AddComment from "../Components/BlogDetail/AddComment";
import Comment from "../Components/BlogDetail/Comment";
import getBlogDetailData from "../API/BlogDetail/getBlogDetail";
import TextViewer from "../Components/BlogDetail/TextViewer";
import "./Style/BlogDetail.css";

export interface BlogDetailProps {
  blogTitle: string;
  createdAt: string;
  modifiedAt: string;
  blogContents: string;
  commentList: {
    commentId: number;
    memberId: number;
    nickName: string;
    profileImageUrl: string;
    comment: string;
    createdAt: string;
    modifiedAt: string;
    parentId: null | number;
  }[];
}

const BlogDetailSpan = styled.span<{ usage?: string }>`
  font-size: var(--font-sm);
  color: ${(props) =>
    props.usage === "nickName" ? "var(--fc-500)" : "var(--fc-400)"};
  cursor: ${(props) => (props.usage === "nickName" ? "pointer" : "")};
  &:hover {
    color: ${(props) => (props.usage === "nickName" ? "var(--fc-400)" : "")};
  }
`;

const BlogDetail = () => {
  //추후 api 데이터 받아올 예정
  const [blogData, setBlogData] = useState<BlogDetailProps>();
  const { writer, blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBlogDetailData();
      setBlogData(res);
    };
    fetchData();
  }, []);
  return (
    <div className="Blog_Detail_Container">
      <div className="Blog_Detail_Title_Container">
        <h1>{blogData && blogData.blogTitle}</h1>
        <div className="Blog_Detail_Title_IM_Container">
          <div className="Blog_Detail_Title_Info">
            <BlogDetailSpan usage="nickName">{writer}</BlogDetailSpan>
            <BlogDetailSpan>
              작성날짜: {blogData && blogData.createdAt}
            </BlogDetailSpan>
            <BlogDetailSpan>
              수정날짜: {blogData && blogData.modifiedAt}
            </BlogDetailSpan>
          </div>
          <div className="Blog_Detail_Title_Manage">
            <button onClick={() => navigate(`/edit/${blogId}`)}>수정</button>
            <button>삭제</button>
          </div>
        </div>
      </div>
      <div className="Blog_Detail_Body_Container">
        {blogData && <TextViewer contents={blogData.blogContents} />}
      </div>
      <div></div>
      <div className="Blog_Detail_Comment_Container">
        <h2>{blogData && blogData.commentList.length} Comment</h2>
        <AddComment />
        {blogData && <Comment commentList={blogData.commentList} />}
      </div>
    </div>
  );
};

export default BlogDetail;
