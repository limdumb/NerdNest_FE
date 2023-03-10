import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import getHomeData from "../API/Home/Get/getHomeData";
import BlogPost from "../Components/Common/BlogPost";
import "./Style/Home.css";

//PostData Type 미리 지정
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
  justify-content: space-between;
  padding-top: 3em;
`;
const Home = () => {
  const sortArr = [
    { k_name: "추천순", e_name: "likes" },
    { k_name: "최신순", e_name: "newest" },
    { k_name: "내 추천", e_name: "myLike" },
  ];
  const [blogList, setBlogList] = useState<ArrPostProps>([
    {
      memberId: 0,
      blogId: 0,
      titleImageUrl: "",
      blogTitle: "",
      blogPreview: "",
      createdAt: "",
      writer: "",
      commentCount: 0,
      likeCount: 0,
    },
  ]);
  const [isSortActive, setIsSortActive] = useState(0);
  const [scrollValue, setScrollValue] = useState(1);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const tab = searchParams.get("tab");
  const interSectRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    setIsLoading(true);
    const get = async () => {
      setIsLoading(false);
      const result = await getHomeData(tab, scrollValue);
      setBlogList([...blogList, ...result]);
    };
    get();
  }, [searchParams, scrollValue]);

  const options = {
    root: null,
    rootMargin: "20px",
    threshold: 1,
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setScrollValue(scrollValue + 1);
      }
    },
    [scrollValue]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (interSectRef.current) observer.observe(interSectRef.current);
    return () => observer.disconnect();
  }, []);

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
                  navigate(`?tab=${sort.e_name}&page=${scrollValue}`);
                  setIsSortActive(idx);
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
      {isLoading ? (
        <p className="Home_Loading_Container" ref={interSectRef}>
          Loading...
        </p>
      ) : null}
    </>
  );
};

export default Home;
