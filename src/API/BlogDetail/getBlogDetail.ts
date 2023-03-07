import { BlogDetailProps } from "../../Pages/BlogDetail";

export default function getBlogDetailData(): Promise<BlogDetailProps> {
  return new Promise((resolve, reject) => {
    try {
      let result: BlogDetailProps = {
        blogTitle: "제목입니다",
        createdAt: "2023.03.06",
        modifiedAt: "2023.03.06",
        blogContents: "<h2>안녕하세요?</h2>",
        commentList: [
          {
            commentId: 1,
            memberId: 1,
            nickName: "minse97",
            profileImageUrl: "",
            comment: "댓글1",
            createdAt: "2022.03.06",
            modifiedAt: "2022.03.06",
            parentId: null,
            recommentList: [
              {
                commentId: 1,
                memberId: 1,
                perentsId: 1,
                nickName: "minse98",
                comment: "대댓글1",
                createdAt: "2022.03.06",
              },
            ],
          },
        ],
      };
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
