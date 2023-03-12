import { ArrPostProps } from "../../../Pages/Home";
import { baseInstance } from "../../Instance/Instance";

export default function getSearchData(
  keyword: string | null,
  page: number
): Promise<ArrPostProps> {
  return new Promise(async (resolve, reject) => {
    let result: ArrPostProps = [];
    try {
      const getSearchData = await baseInstance(
        `/search?keyword=${keyword}?page=${page}`
      );
      result = getSearchData.data.blogList;
    } catch (err) {
      reject(err);
    }
    resolve(result);
  });
}
