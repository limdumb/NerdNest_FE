import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoHeartCircle, IoHeartCircleOutline } from "react-icons/io5";
import AddComment from "../Components/BlogDetail/AddComment";
import Comment from "../Components/BlogDetail/Comment";
import TextViewer from "../Components/BlogDetail/Common/TextViewer";
import postLike from "../API/BlogDetail/Post/postLike";
import getBlogDetailData from "../API/BlogDetail/Get/getBlogDetail";
import deleteBlogPost from "../API/BlogDetail/Delete/deleteBlogPost";
import "./Style/BlogDetail.css";

export interface BlogDetailProps {
  blogTitle: string;
  createdAt: string;
  modifiedAt: string;
  blogContent: string;
  memberId: number;
  commentCount: number;
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
  const [blogData, setBlogData] = useState<BlogDetailProps>();
  const { writer, blogId, memberId } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const userMemberId = Number(localStorage.getItem("memberId"));

  useEffect(() => {
    const get = async () => {
      const result = await getBlogDetailData(Number(blogId));
      setBlogData(result);
    };
    get();
  }, []);

  return (
    <div className="Blog_Detail_Container">
      <div className="Blog_Detail_Title_Container">
        <h1>{blogData && blogData.blogTitle}</h1>
        <div className="Blog_Detail_Title_IM_Container">
          <div className="Blog_Detail_Title_Info">
            <BlogDetailSpan
              usage="nickName"
              onClick={() => navigate(`/${writer}/${memberId}`)}
            >
              {writer}
            </BlogDetailSpan>
            <BlogDetailSpan>
              작성날짜: {blogData && blogData.createdAt}
            </BlogDetailSpan>
            <BlogDetailSpan>
              수정날짜: {blogData && blogData.modifiedAt}
            </BlogDetailSpan>
          </div>
          {blogData && userMemberId === Number(memberId) ? (
            <div className="Blog_Detail_Title_Manage">
              <button onClick={() => navigate(`/edit/${blogId}`)}>수정</button>
              <button onClick={() => deleteBlogPost(Number(blogId))}>
                삭제
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="Blog_Detail_Body_Container">
        {blogData && <TextViewer contents={blogData.blogContent} />}
        <div className="Blog_Detail_Like_Container">
          <IoHeartCircle
            cursor={"pointer"}
            onClick={() => postLike(Number(blogId), accessToken)}
          />
        </div>
      </div>
      <div></div>
      <div className="Blog_Detail_Comment_Container">
        <h2>{blogData && blogData.commentCount} Comment</h2>
        <AddComment accessToken={accessToken} blogId={Number(blogId)} />
        {blogData && (
          <Comment
            commentList={blogData.commentList}
            blogId={Number(blogId)}
            accessToken={accessToken}
          />
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
