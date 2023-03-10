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
  }[];
}

export interface MemberType {
  profileImageUrl: string;
  nickName: string;
  about: string;
}
//member에 대한 데이터 타입 정하기
//그에맞는 데이터 타입으로 내려주기

const Blogs = () => {
  const params = useParams();
  const memberId = localStorage.getItem("memberId");
  const [blogPosts, setBlogPosts] = useState<BlogPostType["blogList"]>([]);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [isProfileEdit, setIsProfileEdit] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<boolean>(false);
  //랜더링을 위한 임시상태
  const [renderState, setRenderState] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      //추후 멤버아이디 받을 예정
      const response = await getBlogPost({ pages: 1, nickName: params.writer });
      setBlogPosts(response);
    };
    fetchBlogPosts();
  }, []);

  const CateogryInitialValue = {
    categoryList: [{ categoryId: 0, categoryName: "" }],
  };
  const memberInitialValue = { profileImageUrl: "", nickName: "", about: "" };

  const categoryData = useFetch<CategoryType>(
    `/category/${params.memberId}`,
    CateogryInitialValue
  );

  const memberData = useFetch<MemberType>(
    `/members/${params.memberId}`,
    memberInitialValue
  );

  return (
    <BlogWrapper>
      <div className="Member_Information_Container">
        <MemberProfileWrapper>
          <MemberProfile
            profileImageUrl={memberData.data.profileImageUrl}
            nickName={memberData.data.nickName}
            about={memberData.data.about}
            memberId={memberId}
            setIsProfileEdit={setIsProfileEdit}
            isProfileEdit={isProfileEdit}
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
                      setNewCategory(false);
                    }}
                  />
                ) : (
                  <TiPen
                    className="Category_Edit_Pen"
                    onClick={() => {
                      setEditActive(true);
                    }}
                  />
                )
              ) : null}
            </div>
          </div>
          <BlogCategory
            categoryList={categoryData.data.categoryList}
            editActive={editActive}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            setRenderState={setRenderState}
            renderState={renderState}
            params={params}
          />
        </CategoryWrapper>
        <BlogPostWrapper>
          <BlogPost blogList={blogPosts} />
        </BlogPostWrapper>
      </div>
    </BlogWrapper>
  );
};

export default Blogs;
