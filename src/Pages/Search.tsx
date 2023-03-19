import SearchInput from "../Components/Search/SearchInput";
import { useEffect, useState } from "react";
import { ArrPostProps, BlogListContainer } from "./Home";
import BlogPost from "../Components/Common/BlogPost";
import { useSearchParams } from "react-router-dom";
import getSearchData from "../API/Search/Get/getSearchData";
import useIntersectionObserver from "../Custom Hook/useIntersectionObserver";
import "./Style/Search.css";

const Search = () => {
  const [blogList, setBlogList] = useState<ArrPostProps | null>([]);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [isNextPage, setIsNextPage] = useState(true);
  const { targetRef, isIntersecting } = useIntersectionObserver();
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    const get = async () => {
      const result = await getSearchData(keyword, page);
      setBlogList(result.blogList);
    };
    get();
  }, []);

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
          const result = await getSearchData(keyword, page);
          if (!result.nextPage) {
            setIsNextPage(false);
            console.log("요청");
          }
          setBlogList((prev) => prev!.concat(result.blogList));
        }
      };
      get();
    }
  }, [page]);

  return (
    <>
      <div className="Search_Wrapper">
        <div className="Search_Container">
          {<SearchInput keyword={keyword} />}
          <BlogListContainer>
            {blogList &&
              blogList.map((post) => (
                <BlogPost key={post.blogId} post={post} />
              ))}
          </BlogListContainer>
        </div>
      </div>
      {isNextPage ? (
        <div className="Home_Loading_Container" ref={targetRef}>
          Loading...
        </div>
      ) : null}
    </>
  );
};

export default Search;
