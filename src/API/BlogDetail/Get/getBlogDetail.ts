import { BlogDetailProps } from "../../../Pages/BlogDetail";
import { baseInstance } from "../../Instance/Instance";

export default function getBlogDetailData(
  blogId: number
): Promise<BlogDetailProps> {
  return new Promise(async (resolve, reject) => {
    let result = [];
    try {
      const getBlogDetailData = await baseInstance(`/blogs/${blogId}`);
      result = getBlogDetailData.data.data;
    } catch (err) {
      reject(err);
    }
    resolve(result);
  });
}