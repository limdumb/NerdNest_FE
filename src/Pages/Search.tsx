import SearchInput from "../Components/Search/SearchInput";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrPostProps, BlogListContainer } from "./Home";
import BlogPost from "../Components/Common/BlogPost";
import { useSearchParams } from "react-router-dom";
import getSearchData from "../API/Search/Get/getSearchData";
import "./Style/Search.css";

const Search = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [scrollValue, setScrollValue] = useState(1);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const interSectRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const get = async () => {
      setIsLoading(false);
      const result = await getSearchData(keyword, scrollValue);
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
      {isLoading ? (
        <p className="Home_Loading_Container" ref={interSectRef}>
          Loading...
        </p>
      ) : null}
    </>
  );
};

export default Search;
