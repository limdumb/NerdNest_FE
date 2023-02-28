import SearchInput from "../Components/SearchInput";
import BlogListDummy from "../API/DummyData/BlogList.json";
import "./Style/Search.css";
import { useEffect, useState } from "react";
import { ArrPostProps, BlogListContainer } from "./Home";
import BlogPost from "../Components/Common/BlogPost";

const Search = () => {
  const [blogList, setBlogList] = useState<ArrPostProps>();
  useEffect(() => {
    setBlogList(BlogListDummy.data);
  }, []);

  return (
    <div className="Search_Wrapper">
      <div className="Search_Container">
        <div className="SearchInput_Container">
          <SearchInput />
        </div>
        <BlogListContainer>
          {blogList &&
            blogList.map((post) => <BlogPost key={post.blogId} post={post} />)}
        </BlogListContainer>
      </div>
    </div>
  );
};

export default Search;
