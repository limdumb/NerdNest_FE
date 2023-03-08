import React, { useEffect, useState } from "react";
import { BlogPostType, getBlogPost } from "../API/Blogs/Get/getBlogPost";
import MemberProfile from "../Components/Blogs/MemberProfile";
import BlogRecord from "../Components/Blogs/BlogRecord";
import BlogPost from "../Components/Blogs/BlogPost";
import BlogCategory from "../Components/Blogs/BlogCategory";
import styled from "styled-components";
import useFetch from "../Custom Hook/useFetch";
import { useParams } from "react-router-dom";
import { VscFolderOpened } from "react-icons/vsc";
import { TiPen } from "react-icons/ti";
import { HiPlusCircle } from "react-icons/hi";
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

const CategoryWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const BlogPostWrapper = styled(Wrapper)`
  width: 70%;
`;

const MemberProfileWrapper = styled(Wrapper)`
  width: 30%;
  align-items: center;
`;

const BlogRecordWrapper = styled(Wrapper)`
  padding-top: 40px;
  width: 70%;
`;

export interface CategoryType {
  categoryList: {
    categoryId: number;
    categoryName: string;
  }[] | undefined;
}

const Blogs = () => {
  const params = useParams();
  const memberId = localStorage.getItem("memberId");
  const [blogPosts, setBlogPosts] = useState<BlogPostType["blogList"]>([]);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      //추후 멤버아이디 받을 예정
      const response = await getBlogPost({ pages: 1, nickName: "가라" });
      setBlogPosts(response);
    };
    fetchBlogPosts();
  }, []);

  const { data } = useFetch<CategoryType>(`/category/${params.memberId}`);
  //카테고리 => 멤버정보 => 블로그리스트 순서대로 데이터 받아볼것
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
          <div className="Category_Title_Container">
            <div className="Category_Title">
              <VscFolderOpened className="Category_Folder_Icon" />
              <h3>카테고리</h3>
            </div>
            <div>
              {editActive ? (
                <HiPlusCircle
                  className="Category_Add_Button"
                  onClick={() => setNewCategory(!newCategory)}
                />
              ) : null}
              {memberId === params.memberId ? (
                editActive ? (
                  <TiPen
                    className="Category_Edit_Pen"
                    onClick={() => {
                      setEditActive(false);
                      setNewCategory(false)
                      console.log("완료 로직");
                    }}
                  />
                ) : (
                  <TiPen
                    className="Category_Edit_Pen"
                    onClick={() => {
                      console.log("수정ON");
                      setEditActive(true);
                    }}
                  />
                )
              ) : null}
            </div>
          </div>
          <BlogCategory categoryList={data?.categoryList} editActive={editActive} newCategory={newCategory}/>
        </CategoryWrapper>
        <BlogPostWrapper>
          <BlogPost blogList={blogPosts} />
        </BlogPostWrapper>
      </div>
    </BlogWrapper>
  );
};

export default Blogs;
