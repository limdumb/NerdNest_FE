import { AxiosResponse } from "axios";
import { BlogArrayType } from "../../../Pages/Blogs";
import { baseInstance } from "../../Instance/Instance";

interface Params {
  pages: number;
  nickName: string | undefined;
  categoryId: number;
}

export default async function getBlogData(params: Params) {
  try{
    const response:AxiosResponse<BlogArrayType> = await baseInstance.get(
      `/blogs/${params.nickName}?categoryId=${params.categoryId}&page=${params.pages}`
    );
    return response.data
  }catch(err){

  }
}
