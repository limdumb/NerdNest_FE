import { IoHeartCircle } from "react-icons/io5";
import { MdOutlineInsertComment } from "react-icons/md";
import { BlogPostType } from "../../API/Blogs/Get/getBlogPost";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const params = useParams();
  return (
    <ul>
      {props.blogList.map((post, index) => {
        return (
          <li
            className="Blog_Post"
            key={index}
            onClick={() =>
              navigate(
                `/${params.writer}/${params.memberId}/${post.blogTitle}/${post.blogId}`
              )
            }
          >
            <BlogPostContainer>
              <BlogPostImage src={`${post.titleImageUrl}`} />
              <BlogContetnsContainer>
                <h1 className="Blog_Title">{post.blogTitle}</h1>
                <div className="Comment_Like_Container">
                  <div className="Like_Container">
                    <span className="Like_Comment_Contetns">
                      {post.likeCount}
                    </span>
                    <IoHeartCircle
                      color="var(--blue-400)"
                      fontSize="var(--font-xxl)"
                    />
                  </div>
                  <div className="Comment_Container">
                    <span className="Like_Comment_Contetns">
                      {post.commentCount}
                    </span>
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
