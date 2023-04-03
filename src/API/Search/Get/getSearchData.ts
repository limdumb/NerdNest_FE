import { GetBlogDataProps } from "../../../Pages/Home";
import { baseInstance } from "../../Instance/Instance";

export default function getSearchData(
  keyword: string | null,
  page: number
): Promise<GetBlogDataProps> {
  return new Promise(async (resolve) => {
    let result: GetBlogDataProps = { blogList: [], nextPage: false };
    try {
      const getSearchData = await baseInstance(
        `/search?keyword=${keyword}&page=${page}`
      );
      result = getSearchData.data;
    } catch (err) {
      result = { blogList: [], nextPage: false };
    }
    resolve(result);
  });
}
