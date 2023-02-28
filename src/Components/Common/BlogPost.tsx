import styled from "styled-components";
import { IoHeartCircle } from "react-icons/io5";
import { MdOutlineInsertComment } from "react-icons/md";
import "./Style/BlogPost.css";

interface SpanStyledProps {
  usage: string;
  marginTop?: string;
}

interface IconStyledProps {
  fontColor: string;
  iconColor: string;
  iconSize: string;
}
//PostData Type 미리 지정
interface PostProps {
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

const PostContent = styled.span<SpanStyledProps>`
  font-size: ${(props) =>
    props.usage === "title"
      ? "var(--font-xxl)"
      : props.usage === "info"
      ? "var(--font-xs)"
      : "var(--font-md)"};
  color: ${(props) =>
    props.usage === "writer" ? "var(--fc-500)" : "var(--fc-300)"};
  font-weight: ${(props) =>
    props.usage === "title"
      ? "var(--fw-bold)"
      : props.usage === "writer"
      ? "var(--fw-bold)"
      : "var(--fw-midium)"};
  margin-top: ${(props) => props.marginTop};
  cursor: pointer;
`;
const IconContainer = styled.div<IconStyledProps>`
  display: flex;
  align-items: center;
  color: ${(props) => props.fontColor};
  font-size: var(--font-sm);

  svg {
    font-size: ${(props) => props.iconSize};
    color: ${(props) => props.iconColor};
    margin-right: 2px;
  }
`;
const BlogPost = ({ post }: { post: PostProps }) => {
  return (
    <>
      <header className="BlogPost_Wrapper">
        <div className="BlogPost_Container">
          <div className="BlogPostImage_Container">
            <img
              className="BlogPostImage"
              src={post.titleImageUrl}
              alt="TitleImage"
            />
          </div>
          <div className="BlogPostBody_Container">
            <PostContent usage="title" marginTop="10px">
              {post.blogTitle}
            </PostContent>
            <div className="BlogPostInfo_Container">
              <PostContent usage="info">{post.createdAt}</PostContent>
              <IconContainer
                fontColor="var(--fc-300)"
                iconColor="var(--fc-300)"
                iconSize="var(--font-md)"
              >
                <MdOutlineInsertComment className="Comment_icon" />
                {post.commentCount}
              </IconContainer>
            </div>
          </div>
          <div className="BlogPostWriter_Container">
            <PostContent usage="writer">{post.writer}</PostContent>
            <IconContainer
              fontColor="var(--fc-500)"
              iconColor="var(--blue-400)"
              iconSize="var(--font-xl)"
            >
              <IoHeartCircle className="Heart_icon" />
              {post.likeCount}
            </IconContainer>
          </div>
        </div>
      </header>
    </>
  );
};

export default BlogPost;
