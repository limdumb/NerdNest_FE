interface Params {
  pages: number;
  categoryName: string;
}

interface CategoryBlogType {
  blogId: number;
  titleImageUrl: string;
  blogTitle: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
}

export default function getCategoryBlog(params: Params) {
  return new Promise((resolve, reject) => {
    try {
      let result: Array<CategoryBlogType> = [];
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
}
