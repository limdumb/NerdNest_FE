import styled from "styled-components";
import { IoHeartCircle } from "react-icons/io5";
import { MdOutlineInsertComment } from "react-icons/md";
import "./Style/BlogPost.css";

interface SpanStyledProps {
  usage: string;
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
const BlogPost = () => {
  return (
    <>
      <div className="BlogPost_Wrapper">
        <div className="BlogPost_Container">
          <div className="BlogPostImage_Container">
            <img
              className="BlogPostImage"
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="TitleImage"
            />
          </div>
          <div className="BlogPostBody_Container">
            <div className="BlogPostBodyTitle_Container">
              <PostContent usage="title">title</PostContent>
            </div>
            <div className="BlogPostBodyContent_Container">
              <PostContent usage="content">content</PostContent>
            </div>
            <div className="BlogPostInfo_Container">
              <PostContent usage="info">2022년 02월 28일</PostContent>
              <IconContainer
                fontColor="var(--fc-300)"
                iconColor="var(--fc-300)"
                iconSize="var(--font-md)"
              >
                <MdOutlineInsertComment className="Comment_icon" />
                12
              </IconContainer>
            </div>
          </div>
          <div className="BlogPostWriter_Container">
            <PostContent usage="writer">글쓴이</PostContent>
            <IconContainer
              fontColor="var(--fc-500)"
              iconColor="var(--blue-400)"
              iconSize="var(--font-xl)"
            >
              <IoHeartCircle className="Heart_icon" />
              12
            </IconContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
