import { ArrPostProps } from "../../../Pages/Home";
import { baseInstance } from "../../Instance/Instance";

export default function getHomeData(
  tab: string | null,
  page: number,
  accessToken?: string | null
): Promise<ArrPostProps> {
  return new Promise(async (resolve, reject) => {
    let result: ArrPostProps = [];
    try {
      if (!tab) {
        const getHomeData = await baseInstance(`/home/blogs?tab=newest&page=1`);
        result = getHomeData.data.blogList;
      }
      if (tab === "myLike") {
        baseInstance.defaults.headers.common["Authorization"] = accessToken;
        const getHomeData = await baseInstance(
          `/home/blogs/mylikes?page=${page}`
        );
        result = getHomeData.data.blogList;
      }
      if (tab === "newest" || tab === "likes") {
        const getHomeData = await baseInstance(
          `/home/blogs?tab=${tab}&page=${page}`
        );
        result = getHomeData.data.blogList;
      }
    } catch (err) {
      reject(err);
    }
    resolve(result);
  });
}
