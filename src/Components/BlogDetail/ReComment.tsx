import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CommentListProps, CommentSpan } from "./Comment";
import CommentInput from "./CommentInput";

const ReComment = ({
  recommentList,
  parentId,
}: {
  recommentList: CommentListProps;
  parentId: number;
}) => {
  const [isEditRecomment, setIsEditRecomment] = useState(false);
  const [editRecomment, setEditRecomment] = useState("");
  const [recommentIdx, setRecommentIdx] = useState(0);
  return (
    <>
      {recommentList.map((recomment, idx) =>
        recomment.parentId === parentId ? (
          <div className="ReComment_Container" key={recomment.commentId}>
            <CommentSpan usage="write">⌙ {recomment.nickName}: </CommentSpan>
            {isEditRecomment && recommentIdx === idx ? (
              <CommentInput
                width="30%"
                height="40px"
                marginLeft="1rem"
                defaultValue={recomment.comment}
                onChange={(e) => setEditRecomment(e.target.value)}
              />
            ) : (
              <CommentSpan>{recomment.comment}</CommentSpan>
            )}
            <CommentSpan usage="date">{recomment.createdAt}</CommentSpan>
            <div className="Comment_Manage_Container">
              <GoPencil
                className="Pencil_icon"
                onClick={() => {
                  setRecommentIdx(idx);
                  setIsEditRecomment(!isEditRecomment);
                }}
              />
              <RiDeleteBin6Line className="Delete_icon" />
            </div>
          </div>
        ) : null
      )}
    </>
  );
};

export default ReComment;
