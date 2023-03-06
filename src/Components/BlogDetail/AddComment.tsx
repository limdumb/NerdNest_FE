import { useState } from "react";
import EventButton from "../Common/EventButton";
import CommentInput from "./CommentInput";

const AddComment = () => {
  const [commentText, setCommentText] = useState("");
  return (
    <div className="AddComment_Container">
      <CommentInput
        width="100%"
        height="100px"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="댓글을 작성해주세요."
      />
      <div className="AddComment_Btn">
        <EventButton usage="write" />
      </div>
    </div>
  );
};

export default AddComment;
