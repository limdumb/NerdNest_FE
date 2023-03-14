import { GetHomeDataProps } from "../../../Pages/Home";
import { baseInstance } from "../../Instance/Instance";

export default function getHomeData(
  tab: string | null,
  page: number,
  accessToken?: string | null
): Promise<GetHomeDataProps> {
  return new Promise(async (resolve, reject) => {
    let result: GetHomeDataProps = { blogList: [], nextPage: false };
    try {
      if (tab === null) {
        const getHomeData = await baseInstance(`/home/blogs?tab=newest&page=${page}`);
        result = getHomeData.data;
      }
      if (tab === "myLike") {
        baseInstance.defaults.headers.common["Authorization"] = accessToken;
        const getHomeData = await baseInstance(
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
