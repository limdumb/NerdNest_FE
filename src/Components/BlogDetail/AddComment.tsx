import { useState } from "react";
import EventButton from "../Common/EventButton";
import CommentInput from "./CommentInput";

const AddComment = () => {
  const [addComment, setAddComment] = useState("");
  return (
    <div className="AddComment_Container">
      <CommentInput
        width="100%"
        height="100px"
        value={addComment}
        onChange={(e) => setAddComment(e.target.value)}
        placeholder="댓글을 작성해주세요."
      />
      <div className="AddComment_Btn">
        <EventButton usage="write" />
      </div>
    </div>
  );
};

export default AddComment;
