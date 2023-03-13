import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import getBlogDetailData from "../API/BlogDetail/Get/getBlogDetail";
import { baseInstance } from "../API/Instance/Instance";
import AddComment from "../Components/BlogDetail/AddComment";
import Comment from "../Components/BlogDetail/Comment";
import TextViewer from "../Components/BlogDetail/Common/TextViewer";
import "./Style/BlogDetail.css";

export interface BlogDetailProps {
  blogTitle: string;
  createdAt: string;
  modifiedAt: string;
  blogContents: string;
  commentList: {
    commentId: number;
    parentId: null | number;
    memberId: number;
    nickname: string;
    profileImageUrl: string;
    commentContent: string;
    createdAt: string;
    modifiedAt: string;
    status: string;
    children: {
      commentId: number;
      parentId: null | number;
      memberId: number;
      nickname: string;
      profileImageUrl: string;
      commentContent: string;
      createdAt: string;
      modifiedAt: string;
      status: string;
    }[];
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
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    baseInstance
      .get(`/blogs/${blogId}`)
      .then((res) => setBlogData(res.data.data));
  }, []);
  console.log(blogData)
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
        <AddComment accessToken={accessToken} blogId={Number(blogId)} />
        {blogData && (
          <Comment commentList={blogData.commentList} blogId={Number(blogId)} accessToken={accessToken} />
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
