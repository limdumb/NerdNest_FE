import SearchInput from "../Components/SearchInput";
import BlogListDummy from "../API/DummyData/BlogList.json";
import { useEffect, useState } from "react";
import { ArrPostProps, BlogListContainer } from "./Home";
import BlogPost from "../Components/Common/BlogPost";
import "./Style/Search.css";

const Search = () => {
  const [blogList, setBlogList] = useState<ArrPostProps>();
  useEffect(() => {
    setBlogList(BlogListDummy.data);
  }, []);

  return (
    <div className="Search_Wrapper">
      <div className="Search_Container">
        <SearchInput />
        <BlogListContainer>
          {blogList &&
            blogList.map((post) => <BlogPost key={post.blogId} post={post} />)}
        </BlogListContainer>
      </div>
    </div>
  );
};

export default Search;
