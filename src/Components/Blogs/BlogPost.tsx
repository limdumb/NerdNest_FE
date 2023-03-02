import styled from "styled-components";
import "./Style/blogPost.css";

interface Props {
  blogList: {
    titleImageUrl: string;
    blogTitle: string;
    createdAt: string;
    commentCount: number;
    likeCount: number;
  }[];
}

const BlogContetnsContainer = styled.div`
  padding-top: 10px;
  padding-left: 20px;
  height: 170px;
`;

const BlogPostContainer = styled.div`
  display: flex;
  width: 880px;
  height: 170px;
  margin-bottom: 40px;
`;

const BlogPostImage = styled.img`
  width: 178px;
  height: 170px;
`;

export default function BlogPost(props: Props) {
  return (
    <ul>
      {props.blogList.map((blog,index) => {
        return (
          <li key={index}>
            <BlogPostContainer>
              <BlogPostImage src={`${blog.titleImageUrl}`} />
              <BlogContetnsContainer>
                <h1>{blog.blogTitle}</h1>
                <div></div>
              </BlogContetnsContainer>
            </BlogPostContainer>
          </li>
        );
      })}
    </ul>
  );
}
