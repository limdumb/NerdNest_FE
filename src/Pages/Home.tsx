import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import getHomeData from "../API/Home/Get/getHomeData";
import BlogPost from "../Components/Common/BlogPost";
import useIntersectionObserver from "../Custom Hook/useIntersectionObserver";
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

export interface GetHomeDataProps {
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
    { k_name: "추천순", e_name: "likes" },
    { k_name: "최신순", e_name: "newest" },
    { k_name: "내 추천", e_name: "myLike" },
  ];
  const [blogList, setBlogList] = useState<ArrPostProps | null>([]);
  const [isSortActive, setIsSortActive] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [isNextPage, setIsNextPage] = useState(true);
  const tab = searchParams.get("tab");
  const accessToken = localStorage.getItem("accessToken");
  const { targetRef, isIntersecting } = useIntersectionObserver();
  const navigate = useNavigate();

  useEffect(() => {
    const get = async () => {
      const result = await getHomeData(tab, page, accessToken);
      setBlogList(result.blogList);
      setIsNextPage(result.nextPage);
    };
    get();
  }, [tab]);

  const intersectCallback = () => {
    if (isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    intersectCallback();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      const get = async () => {
        if (isNextPage) {
          const result = await getHomeData(tab, page, accessToken);
          if (!result.nextPage) {
            setIsNextPage(result.nextPage);
          }
          setBlogList((prev) => prev!.concat(result.blogList));
        }
      };
      get();
    }
  }, [page]);

  return (
    <>
      <section className="Home_Wrapper">
        <div className="Home_Container">
          <ul className="Home_Sort_Container">
            {sortArr.map((sort, idx) => (
              <Sort
                key={idx}
                borderBtm={idx === isSortActive}
                onClick={() => {
                  setPage(1);
                  setIsNextPage(true);
                  if (idx === 2) {
                    if (accessToken) {
                      navigate(`?tab=${sort.e_name}`);
                      setIsSortActive(idx);
                    } else {
                      alert("로그인 후 이용해주시길 바랍니다.");
                    }
                  } else {
                    navigate(`?tab=${sort.e_name}`);
                    setIsSortActive(idx);
                  }
                }}
              >
                {sort.k_name}
              </Sort>
            ))}
          </ul>
          <BlogListContainer>
            {blogList && blogList.length !== 0
              ? blogList.map((post) => (
                  <BlogPost key={post.blogId} post={post} />
                ))
              : null}
          </BlogListContainer>
        </div>
      </section>
      {isNextPage ? (
        <div className="Home_Loading_Container" ref={targetRef}>
          Loading...
        </div>
      ) : null}
    </>
  );
};

export default Home;
