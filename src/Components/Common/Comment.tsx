import React from "react";
import styled from "styled-components";
import { ProfileImage } from "./Header/Header";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReComment from "./ReComment";

interface CommentProps {
  commentId: number;
  memberId: number;
  nickName: string;
  profileImageUrl: string;
  comment: string;
  createdAt: string;
  modifiedAt: string;
  perentsId: null | number;
}

interface CommentStyledProps {
  usage?: string;
}

const CommentSpan = styled.span<CommentStyledProps>`
  color: ${(props) =>
    props.usage === "date" ? "var(--fc-400)" : "var(--fc-500)"};
  font-size: ${(props) =>
    props.usage === "date" ? "var(--font-sm)" : "var(--font-base)"};
  font-weight: ${(props) => (props.usage === "write" ? "var(--fw-bold)" : "")};
  margin-left: 0.5rem;
`;

const Comment = () => {
  return (
    <>
      <div className="Comment_Container">
        <ProfileImage
          src="https://images.unsplash.com/photo-1676824469794-9d8deeaf1f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="memberImage"
        />
        <CommentSpan usage="write">Writer:</CommentSpan>
        <CommentSpan>댓글 남겨봅니다.</CommentSpan>
        <CommentSpan usage="date">2022.02.23</CommentSpan>
        <div className="Comment_Manage_Container">
          <button>답글 달기</button>
          <GoPencil />
          <RiDeleteBin6Line />
        </div>
      </div>
      <ReComment />
    </>
  );
};

export default Comment;
