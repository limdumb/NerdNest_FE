import SearchInput from "../Components/Search/SearchInput";
import { useEffect, useRef, useState } from "react";
import { GetBlogDataProps, BlogListContainer } from "./Home";
import BlogPost from "../Components/Common/BlogPost";
import { useSearchParams } from "react-router-dom";
import getSearchData from "../API/Search/Get/getSearchData";
import "./Style/Search.css";
import InvalidBlog from "../Components/Common/InvalidBlog";

const Search = () => {
  const [searchData, setSearchData] = useState<GetBlogDataProps>({
    blogList: [],
    nextPage: false,
  });
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const keyword = searchParams.get("keyword");
  const sectionRef = useRef(null);

  const getData = async () => {
    setIsLoading(true);
    const res = await getSearchData(keyword, page);
    setSearchData({
      blogList: [...searchData.blogList, ...res.blogList],
      nextPage: res.nextPage,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (keyword !== null) {
      setIsLoading(true);
      const getTabHomeData = async () => {
        const res = await getSearchData(keyword, page);
        setSearchData({ blogList: res.blogList, nextPage: res.nextPage });
        setIsLoading(false);
      };
      getTabHomeData();
    }
  }, [keyword]);

  useEffect(() => {
    if (searchData.nextPage) getData();
  }, [page]);

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
  }, [searchData.nextPage]);

  return (
    <>
      <div className="Search_Wrapper">
        <div className="Search_Container">
          {<SearchInput />}
          {searchData.blogList.length >= 0 ? (
            <div className="Search_Result_Container">
              {keyword &&
                `"${keyword}"에 대한 ${searchData.blogList.length}개의 검색
              결과입니다.`}
            </div>
          ) : null}
          <BlogListContainer>
            {searchData &&
              searchData.blogList.map((post) => (
                <BlogPost key={post.blogId} post={post} />
              ))}
            {keyword && searchData.blogList.length === 0 ? (
              <InvalidBlog />
            ) : null}
          </BlogListContainer>
        </div>
      </div>
      {searchData.nextPage ? (
        <div className="Home_Loading_Container" ref={sectionRef}>
          Loading...
        </div>
      ) : null}
    </>
  );
};

export default Search;
