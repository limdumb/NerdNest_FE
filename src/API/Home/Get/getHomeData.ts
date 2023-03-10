import { ArrPostProps } from "../../../Pages/Home";
import { baseInstance } from "../../Instance/Instance";

export default function getHomeData(
  tab: string | null,
  page: number
): Promise<ArrPostProps> {
  return new Promise(async (resolve, reject) => {
    let result: ArrPostProps = [];
    try {
      const getHomeData = await baseInstance(
        `/home/blogs?tab=${tab}&page=${page}`
      );
      result = getHomeData.data.blogList;
    } catch (err) {
      reject(err);
    }
    resolve(result);
  });
}
