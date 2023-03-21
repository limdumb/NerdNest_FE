import { NavigateFunction } from "react-router-dom";
import { tokenInstance } from "../../Instance/Instance";

interface Params {
  nickName: string;
  about: string;
  memberId: number;
  categoryName: string;
  categoryId: number;
}

export default async function editMemberData(params: Params) {
  const request = {
    nickName: params.nickName,
    about: params.about,
  };
  if (params.nickName.length !== 0) {
    try {
      const response = await tokenInstance.patch(
        `/members/${params.memberId}`,
        request
      );
      return response.status;
    } catch (err: any) {
      console.log(err);
    }
  }
}
