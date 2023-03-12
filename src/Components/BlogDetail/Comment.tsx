import { useState } from "react";
import { ProfileImage } from "../Header/Header";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReComment from "./ReComment";
import CommentInput from "./Common/CommentInput";
import postComment from "../../API/BlogDetail/Post/postComment";
import { CommentCommonBtn, CommentSpan } from "./Common/Styled/CommentStyled";
import patchComment from "../../API/BlogDetail/Patch/patchComment";
import deleteComment from "../../API/BlogDetail/Delete/deleteComment";

export interface CommentProps {
  commentId: number;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  commentContent: string;
  createdAt: string;
  modifiedAt: string;
  parentId: null | number;
  children: {
    commentId: number;
    parentId: null | number;
    memberId: number;
    nickname: string;
    profileImageUrl: string;
    commentContent: string;
    createdAt: string;
    modifiedAt: string;
  }[];
}

export interface CommentListProps extends Array<CommentProps> {}

const Comment = ({
  commentList,
  blogId,
  accessToken,
}: {
  commentList: CommentListProps;
  blogId: number;
  accessToken: string | null;
}) => {
  const [commentValue, setCommentValue] = useState("");
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [isRecomment, setIsRecomment] = useState(false);
  const [commentIdx, setCommentIdx] = useState(0);
  const content = {
    blogId: Number(blogId),
    parentId: commentIdx + 1,
    commentContent: commentValue,
  };

  return (
    <>
      {commentList.map((comment: CommentProps, idx) =>
        comment.parentId === null ? (
          <div className="Comment_Wrapper" key={comment.commentId}>
            <div className="Comment_Container">
              <ProfileImage src={comment.profileImageUrl} alt="memberImage" />
              <CommentSpan usage="write">{comment.nickname} :</CommentSpan>
              {isCommentEdit && idx === commentIdx ? (
                <>
                  <CommentInput
                    width="30%"
                    height="40px"
                    marginLeft="1rem"
                    defaultValue={comment.commentContent}
                    onChange={(e) => setCommentValue(e.target.value)}
                  />
                  <CommentCommonBtn
                    usage="edit"
                    onClick={() => setIsCommentEdit(false)}
                  >
                    취소
                  </CommentCommonBtn>
                  <CommentCommonBtn
                    usage="edit"
                    onClick={() =>
                      patchComment(comment.commentId, commentValue, accessToken)
                    }
                  >
                    완료
                  </CommentCommonBtn>
                </>
              ) : (
                <CommentSpan>{comment.commentContent}</CommentSpan>
              )}
              <CommentSpan usage="date">{comment.createdAt}</CommentSpan>
              <div className="Comment_Manage_Container">
                <button
                  className="isReComment_Btn"
                  onClick={() => setIsRecomment(!isRecomment)}
                >
                  {isRecomment ? "답글 취소" : "답글 달기"}
                </button>
                <GoPencil
                  className="Pencil_icon"
                  onClick={() => {
                    setCommentIdx(idx);
                    setIsCommentEdit(!isCommentEdit);
                  }}
                />
                <RiDeleteBin6Line
                  className="Delete_icon"
                  onClick={() => deleteComment(comment.commentId, accessToken)}
                />
              </div>
            </div>
            <div className="Comment_Input_Container">
              {isRecomment ? (
                <>
                  <CommentInput
                    width="50%"
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    placeholder="댓글을 입력해주세요."
                    marginLeft="7rem"
                    marginBottom="1.5rem"
                  ></CommentInput>
                  <CommentCommonBtn
                    onClick={() => {
                      postComment(content, accessToken);
                      setCommentValue("");
                    }}
                  >
                    작성
                  </CommentCommonBtn>
                </>
              ) : null}
            </div>
            <ReComment
              commentList={commentList}
              parentId={comment.commentId}
              accessToken={accessToken}
            />
          </div>
        ) : null
      )}
    </>
  );
};

export default Comment;
