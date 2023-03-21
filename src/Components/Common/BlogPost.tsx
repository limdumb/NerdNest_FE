import styled from "styled-components";
import { IoHeartCircle } from "react-icons/io5";
import { MdOutlineInsertComment } from "react-icons/md";
import { PostProps } from "../../Pages/Home";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const {
    blogId,
    memberId,
    titleImageUrl,
    blogTitle,
    createdAt,
    commentCount,
    writer,
    likeCount,
  } = post;
  return (
    <>
      <div
        className="Blog_Post_Wrapper"
        onClick={() => navigate(`${writer}/${memberId}/${blogTitle}/${blogId}`)}
      >
        <div className="Blog_Post_Container">
          <div className="Blog_Post_Image_Container">
            <img
              className="Blog_Post_Image"
              src={titleImageUrl}
              alt="TitleImage"
            />
          </div>
          <div className="Blog_Post_Body_Container">
            <PostContent usage="title" marginTop="10px">
              {blogTitle}
            </PostContent>
            <div className="Blog_Post_Info_Container">
              <PostContent usage="info">{createdAt}</PostContent>
              <IconContainer
                fontColor="var(--fc-300)"
                iconColor="var(--fc-300)"
                iconSize="var(--font-md)"
              >
                <MdOutlineInsertComment className="Comment_icon" />
                {commentCount}
              </IconContainer>
            </div>
          </div>
          <div className="Blog_Post_Writer_Container">
            <PostContent usage="writer">{writer}</PostContent>
            <IconContainer
              fontColor="var(--fc-500)"
              iconColor="var(--blue-400)"
              iconSize="var(--font-xl)"
            >
              <IoHeartCircle className="Heart_icon" />
              {likeCount}
            </IconContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;