import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import getHomeData from "../API/Home/Get/getHomeData";
import BlogPost from "../Components/Common/BlogPost";
import InvalidBlog from "../Components/Common/InvalidBlog";
import "./Style/Home.css";

export interface PostProps {
  memberId: number;
  blogId: number;
  titleImageUrl: string;
  blogTitle: string;
  blogPreview: string;
  createdAt: string;
  writer: string;
  commentCount: number;
  likeCount: number;
}

export interface ArrPostProps extends Array<PostProps> {}

export interface GetBlogDataProps {
  blogList: PostProps[];
  nextPage: boolean;
}

const Sort = styled.li<{ borderBtm: boolean }>`
  color: var(--fc-500);
  font-weight: var(--fw-bold);
  border-bottom: ${(props) =>
    props.borderBtm ? "1px solid var(--fc-500)" : "none"};
  cursor: pointer;
`;

export const BlogListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 3em;
  gap: 3em 12.5%;
`;
const Home = () => {
  const sortArr = [
    { k_name: "최신순", e_name: "newest" },
    { k_name: "추천순", e_name: "likes" },
    { k_name: "내 추천", e_name: "myLike" },
  ];
  const [blogData, setBlogData] = useState<GetBlogDataProps>({
    blogList: [],
    nextPage: false,
  });
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const tab = searchParams.get("tab");
  const sectionRef = useRef(null);

  const getData = async () => {
    const res = await getHomeData(tab, page);
    setBlogData({
      blogList: [...blogData.blogList, ...res.blogList],
      nextPage: res.nextPage,
    });
  };

  useEffect(() => {
    if (blogData.nextPage) {
      getData();
    }
  }, [page]);

  useEffect(() => {
    const getTabHomeData = async () => {
      const res = await getHomeData(tab, page);
      setBlogData({ blogList: res.blogList, nextPage: res.nextPage });
    };
    getTabHomeData();
  }, [tab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((page) => page + 1);
        }
      },
      { threshold: 1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
    };
  }, [blogData.nextPage]);

  return (
    <>
      <section className="Home_Wrapper">
        <div className="Home_Container">
          <ul className="Home_Sort_Container">
            {sortArr.map((sort, idx) => (
              <Sort
                key={idx}
                borderBtm={sort.e_name === tab}
                onClick={() => {
                  setPage(1);
                  if (idx === 2) {
                    if (accessToken) {
                      navigate(`?tab=${sort.e_name}`);
                    } else {
                      alert("로그인 후 이용해주시길 바랍니다.");
                    }
                  } else {
                    navigate(`?tab=${sort.e_name}`);
                  }
                }}
              >
                {sort.k_name}
              </Sort>
            ))}
          </ul>
          <BlogListContainer>
            {blogData && blogData.blogList.length !== 0 ? (
              blogData.blogList.map((post) => (
                <BlogPost key={post.blogId} post={post} />
              ))
            ) : (
              <InvalidBlog />
            )}
          </BlogListContainer>
        </div>
      </section>
      <div>
        {blogData.nextPage ? (
          <div className="Home_Loading_Container" ref={sectionRef}>
            Loading...
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;
