interface BlogListType {
  titleImageUrl: string;
  blogTitle: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
}

export interface BlogPostType {
  blogList: BlogListType[];
}

export const getBlogPost = (
  pages: number
): Promise<BlogPostType["blogList"]> => {
  return new Promise((resolve, reject) => {
    try {
      let result: BlogPostType["blogList"] = [];
      for (let i = 1; i < 20; i++) {
        result.push({
          titleImageUrl: "",
          blogTitle: `${i}번`,
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
