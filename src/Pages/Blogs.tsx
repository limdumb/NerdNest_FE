import { useEffect, useRef, useState } from "react";
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
import getBlogData from "../API/Blogs/Get/getBlogData";

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

interface BlogType {
  blogId: number;
  titleImageUrl: string;
  blogTitle: string;
  createdAt: string;
  modifiedAt: string;
  commentCount: number;
  likeCount: number;
}

const Blogs = () => {
  const params = useParams();
  const [pages, setPages] = useState<number>(1);
  const CateogryInitialValue = {
    categoryList: [{ categoryId: 0, categoryName: "" }],
  };
  const memberInitialValue = { profileImageUrl: "", nickName: "", about: "" };
  const blogInitialValue: BlogArrayType = {
    blogList: [
      {
        blogId: 0,
        titleImageUrl: "",
        blogTitle: "",
        createdAt: "",
        modifiedAt: "",
        commentCount: 0,
        likeCount: 0,
      },
    ],
  };
  const fetchCategoryData = useFetch<CategoryType>(
    `/category/${params.memberId}`,
    CateogryInitialValue
  );

  const memberData = useFetch<MemberType>(
    `/members/${params.memberId}`,
    memberInitialValue
  );

  const [activeCategoryId, setActiveCategoryId] = useState("");
  const blogData = useFetch<BlogArrayType>(
    `/blogs/member/${params.nickName}?categoryid=${activeCategoryId}page=${pages}`,
    blogInitialValue
  );

  const memberId = localStorage.getItem("memberId");
  const [editActive, setEditActive] = useState<boolean>(false);
  const [isProfileEdit, setIsProfileEdit] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<boolean>(false);
  //랜더링을 위한 임시상태
  const [renderState, setRenderState] = useState<boolean>(false);
  const [newBlogsData, setNewBlogsData] = useState<BlogArrayType>(
    blogData.data
  );
  const [categoryData, setCategoryData] = useState<CategoryType>(
    fetchCategoryData.data
  );
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBlogDataFunction = async () => {
      const result = await getBlogData({
        pages: pages,
        nickName: params.nickName,
        categoryId: activeCategoryId,
      });
      setNewBlogsData(result as BlogArrayType);
      setFetchLoading(false);
    };
    if (!fetchLoading) {
      getBlogDataFunction();
    }
  }, [pages, activeCategoryId]);

  useEffect(() => {
    if (!fetchCategoryData.loading) {
      setCategoryData({
        categoryList: fetchCategoryData.data.categoryList.filter((el) => {
          return el.categoryName !== "전체";
        }),
      });
    }
  }, [fetchCategoryData.data]);

  const [lock, setLock] = useState<boolean>(false);
  const bottomRef = useRef(null);
  // console.log("Outside of fetch BlogData");
  // console.log(blogData.data.blogList);

  const fetchBlogData = () => {
    if (blogData.data.blogList.length === 0 && !fetchLoading) {
      setLock(true);
    } else {
      let newBlogArr = [...newBlogsData.blogList].concat(
        blogData && blogData.data.blogList
      );
      newBlogArr = newBlogArr.concat(blogData.data.blogList);
      setNewBlogsData({ blogList: newBlogArr });
    }
  };

  useEffect(() => {
    if (!fetchLoading) fetchBlogData();
  }, [pages]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (lock === true) {
          return;
        }
        setPages(pages + 1);
      }
    });
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [newBlogsData]);

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
          <BlogPost blogList={blogData.data.blogList} />
        </BlogPostWrapper>
      </div>
      {blogData.loading ? <div ref={bottomRef}>loading...</div> : null}
    </BlogWrapper>
  );
};

export default Blogs;
