interface BlogListType {
  blogId: number;
  titleImageUrl: string;
  blogTitle: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
}

export interface BlogPostType {
  blogList: BlogListType[];
}

interface Params {
  pages: number;
  nickName: string;
}

export const getBlogPost = (
  params: Params
): Promise<BlogPostType["blogList"]> => {
  return new Promise((resolve, reject) => {
    try {
      let result: BlogPostType["blogList"] = [];
      for (let i = 1; i < 20; i++) {
        result.push({
          blogId: i,
          titleImageUrl: "",
          blogTitle: `${i}번 입니다 이게 뭐죠? 이게뭔데요?`,
          createdAt: `${i}날짜`,
          commentCount: i,
          likeCount: i,
        });
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
