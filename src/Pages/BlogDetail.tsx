import React, { useState } from "react";
import BlogDetailComment from "../Components/Common/Comment";
import "./Style/BlogDetail.css";

interface BlogDetailProps {
  blogTitle: string;
  createdAt: string;
  blogContents: string;
  comments: [
    {
      commentId: number;
      memberId: number;
      nickName: string;
      profileImageUrl: string;
      comment: string;
      createdAt: string;
      modifiedAt: string;
      perentsId: null | number;
    }
  ];
}

const BlogDetail = () => {
  const [blogData, setBlogData] = useState<BlogDetailProps>();
  return (
    <div className="BlogDetail_Container">
      <div className="BlogDetail_Title_Container">
        <h1>제목</h1>
        <div className="BlogDetail_Title_IM_Container">
          <div className="BlogDetail_Title_Info">
            <span>nickName</span>
            <span>creaetedAt</span>
            <span>modifiedAt</span>
          </div>
          <div className="BlogDetail_Title_Manage">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
      </div>
      <div className="BlogDetail_Body_Container">{/* Contents */}</div>
      <div className="BlogDetail_Comment_Container">
        <h2>2 Comment</h2>
        <BlogDetailComment />
      </div>
    </div>
  );
};

export default BlogDetail;
