import { GetBlogDataProps } from "../../../Pages/Home";
import { baseInstance, tokenInstance } from "../../Instance/Instance";

export default function getHomeData(
  tab: string | null,
  page: number
): Promise<GetBlogDataProps> {
  return new Promise(async (resolve, reject) => {
    let result: GetBlogDataProps = { blogList: [], nextPage: false };
    try {
      if (tab === null) {
        const getHomeData = await baseInstance(
          `/home/blogs?tab=newest&page=${page}`
        );
        result = getHomeData.data;
      }
      if (tab === "myLike") {
        const getHomeData = await tokenInstance(
          `/home/blogs/mylikes?page=${page}`
        );
        result = getHomeData.data;
      }
      if (tab === "newest" || tab === "likes") {
        const getHomeData = await baseInstance(
          `/home/blogs?tab=${tab}&page=${page}`
        );
        result = getHomeData.data;
      }
    } catch (err) {
      reject(err);
    }
    resolve(result);
  });
}
