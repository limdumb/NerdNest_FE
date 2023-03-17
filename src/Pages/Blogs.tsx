import { useEffect, useRef, useState } from "react";
import MemberProfile from "../Components/Blogs/MemberProfile";
import BlogPost from "../Components/Blogs/BlogPost";
import BlogCategory from "../Components/Blogs/BlogCategory";
import styled from "styled-components";
import useFetch from "../Custom Hook/useFetch";
import { useParams } from "react-router-dom";
import { VscFolderOpened } from "react-icons/vsc";
import { TiPen } from "react-icons/ti";
import { HiPlusCircle } from "react-icons/hi";
import getBlogData from "../API/Blogs/Get/getBlogData";
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

export interface BlogArrayType {
  nextPage: boolean;
  blogList: {
    blogId: number;
    titleImageUrl: string;
    blogTitle: string;
    createdAt: string;
    modifiedAt: string;
    commentCount: number;
    likeCount: number;
  }[];
}

const Blogs = () => {
  const params = useParams();
  const [pages, setPages] = useState<number>(1);
  const CateogryInitialValue = {
    categoryList: [{ categoryId: 0, categoryName: "" }],
  };

  const memberInitialValue = { profileImageUrl: "", nickName: "", about: "" };
  const blogInitialValue: BlogArrayType = {
    nextPage: true,
    blogList: [],
  };

  const fetchCategoryData = useFetch<CategoryType>(
    `/category/${params.memberId}`,
    CateogryInitialValue
  );

  const memberData = useFetch<MemberType>(
    `/members/${params.memberId}`,
    memberInitialValue
  );
  const [activeCategoryId, setActiveCategoryId] = useState(0);

  const query = new URLSearchParams(window.location.search).get("id");
  const memberId = localStorage.getItem("memberId");
  const [editActive, setEditActive] = useState<boolean>(false);
  const [isProfileEdit, setIsProfileEdit] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<boolean>(false);
  const [renderState, setRenderState] = useState<boolean>(false);
  const [blogData, setBlogData] = useState<BlogArrayType>(blogInitialValue);
  const [categoryData, setCategoryData] = useState<CategoryType>(
    fetchCategoryData.data
  );
  const [loading, setLoading] = useState<boolean>(false);

  const getblogDataResponse = async () => {
    setLoading(true);
    const response = await getBlogData({
      pages: pages,
      nickName: params.nickName,
      categoryId: activeCategoryId,
    });
    setLoading(false);
    const newData = [...blogData.blogList, ...response.blogList];
    setBlogData({ blogList: newData, nextPage: response.nextPage });
  };

  useEffect(() => {
    if (blogData.nextPage) {
      getblogDataResponse();
    }
  }, [pages]);

  useEffect(() => {
    setPages(1);
    const changeCategoryBlogData = async () => {
      const response = await getBlogData({
        pages: pages,
        nickName: params.nickName,
        categoryId: activeCategoryId,
      });
      setBlogData({ blogList: response.blogList, nextPage: response.nextPage });
    };
    changeCategoryBlogData();
  }, [query]);
  console.log(blogData);
  useEffect(() => {
    if (!fetchCategoryData.loading) {
      setCategoryData({
        categoryList: fetchCategoryData.data.categoryList.filter((el) => {
          return el.categoryName !== "전체";
        }),
      });
    }
  }, [fetchCategoryData.data]);
  const bottomRef = useRef(null);
  console.log(categoryData.categoryList);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPages(pages + 1);
      }
    });
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [blogData]);

  return (
    <BlogWrapper>
      <div className="Member_Information_Container">
        <MemberProfileWrapper>
          <MemberProfile
            params={params}
            profileImageUrl={memberData.data.profileImageUrl}
            nickName={memberData.data.nickName}
            about={memberData.data.about}
            memberId={memberId}
            setIsProfileEdit={setIsProfileEdit}
            isProfileEdit={isProfileEdit}
          />
        </MemberProfileWrapper>
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
            setActiveCategoryId={setActiveCategoryId}
            categoryList={categoryData.categoryList}
            editActive={editActive}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            setRenderState={setRenderState}
            renderState={renderState}
            params={params}
          />
        </CategoryWrapper>
        <BlogPostWrapper>
          <BlogPost blogList={blogData && blogData.blogList} nextPage={false} />
        </BlogPostWrapper>
      </div>
      {loading ? <div>loading...</div> : null}
      {blogData.blogList.length >= 8 ? <div ref={bottomRef} /> : null}
    </BlogWrapper>
  );
};

export default Blogs;
