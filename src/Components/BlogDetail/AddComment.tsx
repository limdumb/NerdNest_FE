import { useState } from "react";
import { useParams } from "react-router-dom";
import postComment from "../../API/BlogDetail/Post/postComment";
import EventButton from "../Common/EventButton";
import CommentInput from "./Common/CommentInput";

const AddComment = ({
  accessToken,
  blogId,
}: {
  accessToken: string | null;
  blogId: number;
}) => {
  const [commentText, setCommentText] = useState("");
  const memberId = Number(localStorage.getItem("memberId"));
  const content = {
    blogId: Number(blogId),
    parentId: null,
    commentContent: commentText,
  };
  return (
    <div className="AddComment_Container">
      <CommentInput
        width="100%"
        height="100px"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder={
          !memberId ? "로그인 후 사용해주세요" : "댓글을 작성해주세요."
        }
      />
      <div className="AddComment_Btn">
        <EventButton
          usage="write"
          onClick={() => postComment(content, accessToken)}
        />
      </div>
    </div>
  );
};

export default AddComment;
