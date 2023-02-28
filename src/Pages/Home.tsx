import { useEffect, useState } from "react";
import styled from "styled-components";
import blogListDummy from "../API/DummyData/BlogList.json";
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

const Home = () => {
  const sortArr: string[] = ["추천순", "최신순", "내 추천"];
  const [blogList, setBlogList] = useState<ArrPostProps>();
  const [isSortActive, setIsSortActive] = useState(0);

  useEffect(() => {
    setBlogList(blogListDummy.data);
  }, []);

  console.log(blogList);
  return (
    <div className="Home_Wrapper">
      <div className="Home_Container">
        <ul className="HomeSort_Container">
          {sortArr.map((sort, idx) => (
            <Sort
              key={idx}
              borderBtm={idx === isSortActive}
              onClick={() => setIsSortActive(idx)}
            >
              {sort}
            </Sort>
          ))}
        </ul>
        <div className="Home_BlogList_Container">
          {blogList &&
            blogList.map((post) => <BlogPost key={post.blogId} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
