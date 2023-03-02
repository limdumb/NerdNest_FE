import { IoHeartCircle } from "react-icons/io5";
import { MdOutlineInsertComment } from "react-icons/md";
import { BlogPostType } from "../../API/Blogs/getBlogPost";
import styled from "styled-components";
import "./Style/blogPost.css";

const BlogContetnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 20px;
  height: 170px;
  width: 662px;
`;

const BlogPostContainer = styled.div`
  display: flex;
  width: 840px;
  height: 170px;
  margin-bottom: 40px;
`;

const BlogPostImage = styled.img`
  width: 178px;
  height: 170px;
`;

export default function BlogPost(props: BlogPostType) {
  return (
    <ul>
      {props.blogList.map((post, index) => {
        return (
          <li key={index}>
            <BlogPostContainer>
              <BlogPostImage src={`${post.titleImageUrl}`} />
              <BlogContetnsContainer>
                <h1 className="Blog_Title">{post.blogTitle}</h1>
                <div className="Comment_Like_Container">
                  <div className="Like_Container">
                    <h2>{post.likeCount}</h2>
                    <IoHeartCircle
                      color="var(--blue-400)"
                      fontSize="var(--font-xxl)"
                    />
                  </div>
                  <div className="Comment_Container">
                    <h2>{post.commentCount}</h2>
                    <MdOutlineInsertComment
                      color="var(--blue-400)"
                      fontSize="var(--font-xxl)"
                    />
                  </div>
                  <span></span>
                </div>
                <h4>{post.createdAt}</h4>
              </BlogContetnsContainer>
            </BlogPostContainer>
          </li>
        );
      })}
    </ul>
  );
}
