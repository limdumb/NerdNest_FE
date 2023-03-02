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
  margin-top: 20px;
`;

const CategoryWrapper = styled(Wrapper)`
  width: 30%;
  background-color: pink;
`;

const BlogPostWrapper = styled(Wrapper)`
  background-color: orange;
  width: 70%;
`;

const MemberProfileWrapper = styled(Wrapper)`
  width: 30%;
  background-color: aqua;
  align-items: center;
`;

const BlogRecordWrapper = styled(Wrapper)`
  padding-top: 40px;
  width: 70%;
  background-color: blue;
`;

const Blogs = () => {
  const test = [
    {
      titleImageUrl: "",
      createdAt: "2022년 2월 24일",
      commentCount: 2,
      likeCount: 2
    },
    {
      titleImageUrl: "",
      createdAt: "2022년 2월 24일",
      commentCount: 2,
      likeCount: 2
    },
    {
      titleImageUrl: "",
      createdAt: "2022년 2월 24일",
      commentCount: 2,
      likeCount: 2
    },
  ];
  return (
    <BlogWrapper>
      <div className="Member_Information_Container">
        <MemberProfileWrapper>
          <MemberProfile
            //추후 데이터값으로 변경 예정
            profileImageUrl={
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            nickName={"경인"}
            about={"안녕하세요 개발자 임경인 입니다"}
          />
        </MemberProfileWrapper>
        <BlogRecordWrapper>
          <BlogRecord />
        </BlogRecordWrapper>
      </div>
      <div className="Blog_Information_Container">
        <CategoryWrapper>
          <h4>카테고리</h4>
          <BlogCategory />
        </CategoryWrapper>
        <BlogPostWrapper>
          <BlogPost blogList={test}/>
        </BlogPostWrapper>
      </div>
    </BlogWrapper>
  );
};

export default Blogs;
