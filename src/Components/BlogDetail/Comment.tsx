import { useState } from "react";
import styled from "styled-components";
import { ProfileImage } from "../Header/Header";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReComment from "./ReComment";
import CommentInput from "./CommentInput";

interface CommentListProps {
  commentId: number;
  memberId: number;
  nickName: string;
  profileImageUrl: string;
  comment: string;
  createdAt: string;
  modifiedAt: string;
  parentId: null | number;
  recommentList: [
    {
      commentId: number;
      memberId: number;
      perentsId: number;
      nickName: string;
      comment: string;
      createdAt: string;
    }
  ];
}

interface CommentStyledProps {
  usage?: string;
}

export const CommentSpan = styled.span<CommentStyledProps>`
  color: ${(props) =>
    props.usage === "date" ? "var(--fc-400)" : "var(--fc-500)"};
  font-size: ${(props) =>
    props.usage === "date" ? "var(--font-sm)" : "var(--font-base)"};
  font-weight: ${(props) => (props.usage === "write" ? "var(--fw-bold)" : "")};
  margin-left: 0.5rem;
  cursor: ${(props) => (props.usage === "write" ? "pointer" : "")};
  &:hover {
    color: ${(props) => (props.usage === "write" ? "var(--fc-400)" : "")};
  }
`;

const Comment = ({ commentList }: { commentList: CommentListProps }) => {
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState(commentList.comment);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [isRecomment, setIsRecomment] = useState(false);
  return (
    <>
      <div className="Comment_Wrapper">
        <div className="Comment_Container">
          <ProfileImage
            src="https://images.unsplash.com/photo-1676824469794-9d8deeaf1f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="memberImage"
          />
          <CommentSpan usage="write">{commentList.nickName} :</CommentSpan>
          {isCommentEdit ? (
            <CommentInput
              width="30%"
              height="40px"
              marginLeft="1rem"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
          ) : (
            <CommentSpan>{commentList.comment}</CommentSpan>
          )}
          <CommentSpan usage="date">{commentList.createdAt}</CommentSpan>
          <div className="Comment_Manage_Container">
            <button
              className="isReComment_Btn"
              onClick={() => setIsRecomment(!isRecomment)}
            >
              {isRecomment ? "답글 취소" : "답글 달기"}
            </button>
            <GoPencil
              className="Pencil_icon"
              onClick={() => setIsCommentEdit(!isCommentEdit)}
            />
            <RiDeleteBin6Line className="Delete_icon" />
          </div>
        </div>
        {commentList.recommentList.map((recommentList) => (
          <ReComment
            key={recommentList.commentId}
            recommentList={recommentList}
          />
        ))}

        <div className="Comment_Input_Container">
          {isRecomment ? (
            <>
              <CommentInput
                width="50%"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="댓글을 입력해주세요."
                marginLeft="7rem"
                marginBottom="1.5rem"
              ></CommentInput>
              <button className="Recomment_Btn">작성</button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Comment;
