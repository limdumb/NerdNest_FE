import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import deleteComment from "../../API/BlogDetail/Delete/deleteComment";
import patchComment from "../../API/BlogDetail/Patch/patchComment";
import { CommentListProps } from "./Comment";
import CommentInput from "./Common/CommentInput";
import { CommentCommonBtn, CommentSpan } from "./Common/Styled/CommentStyled";

const ReComment = ({
  commentList,
  parentId,
  accessToken,
}: {
  commentList: CommentListProps;
  parentId: number;
  accessToken: string | null;
}) => {
  const [isEditRecomment, setIsEditRecomment] = useState(false);
  const [editRecomment, setEditRecomment] = useState("");
  const [recommentIdx, setRecommentIdx] = useState(0);
  const memberId = Number(localStorage.getItem("memberId"));
  const navigate = useNavigate();
  return (
    <>
      {commentList.map((recommentList) =>
        recommentList.children.map((recomment, idx) =>
          recomment.parentId === parentId ? (
            <div className="ReComment_Container" key={recomment.commentId}>
              <CommentSpan
                usage="write"
                onClick={() =>
                  navigate(`/${recomment.nickname}/${recomment.memberId}`)
                }
              >
                ⌙ {recomment.nickname}:
              </CommentSpan>
              {isEditRecomment && recommentIdx === idx ? (
                <>
                  <CommentInput
                    width="30%"
                    height="40px"
                    marginLeft="1rem"
                    defaultValue={recomment.commentContent}
                    onChange={(e) => setEditRecomment(e.target.value)}
                  />
                  <CommentCommonBtn
                    usage="edit"
                    onClick={() => setIsEditRecomment(false)}
                  >
                    취소
                  </CommentCommonBtn>
                  <CommentCommonBtn
                    usage="edit"
                    onClick={() =>
                      patchComment(recomment.commentId, editRecomment)
                    }
                  >
                    완료
                  </CommentCommonBtn>
                </>
              ) : (
                <CommentSpan>{recomment.commentContent}</CommentSpan>
              )}
              <CommentSpan usage="date">{recomment.createdAt}</CommentSpan>
              {memberId === recomment.memberId ? (
                <div className="Comment_Manage_Container">
                  <GoPencil
                    className="Pencil_icon"
                    onClick={() => {
                      setRecommentIdx(idx);
                      setIsEditRecomment(!isEditRecomment);
                    }}
                  />
                  <RiDeleteBin6Line
                    className="Delete_icon"
                    onClick={() => deleteComment(recomment.commentId)}
                  />
                </div>
              ) : null}
            </div>
          ) : null
        )
      )}
    </>
  );
};

export default ReComment;
