import React from "react";
import MemberProfile from "../Components/Blogs/MemberProfile";
import BlogRecord from "../Components/Blogs/BlogRecord";
import BlogPost from "../Components/Blogs/BlogPost";
import BlogCategory from "../Components/Blogs/BlogCategory";
import styled from "styled-components";
import "./Style/blogs.css";

//추후 공용으로 뺄지는 상의예정
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlogWrapper = styled(Wrapper)`
  height: 100%;
`;

const Blogs = () => {
  return (
    <BlogWrapper>
      <div className="Member_Information_Container">
        <div className="Member_Profile_Container">
          <MemberProfile />
        </div>
        <div className="Blog_Record_Container">
          <BlogRecord />
        </div>
      </div>
      <div className="Blog_Information_Container"></div>
    </BlogWrapper>
  );
};

export default Blogs;
