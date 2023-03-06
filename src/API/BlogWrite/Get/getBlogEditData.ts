import axios from "axios";
//Authorization 토큰 필요
interface BlogDataType {
  titleImageUrl: string;
  blogTitle: string;
  blogContent: string;
  categoryId: number;
}

export default function getBlogEditData(): Promise<BlogDataType> {
  return new Promise((resolve, reject) => {
    try {
      let result:BlogDataType = {
        titleImageUrl: "",
        blogTitle: "리액트 어려버",
        blogContent: "<p>ㅎㅇ</p>",
        categoryId: 0
      }
      resolve(result)
    } catch (err) {
      reject(err);
    }
  });
}
