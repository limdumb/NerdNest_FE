import { NavigateFunction } from "react-router-dom";
import { tokenInstance } from "../../Instance/Instance";

interface Params {
  nickName: string;
  about: string;
  memberId: number;
  navigate: NavigateFunction;
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
      await tokenInstance
        .patch(`/members/${params.memberId}`, request)
        .then((res) => {
          if (res.status === 200) {
            alert("수정이 완료 되었습니다!");
            params.navigate(
              `/${params.nickName}/${params.memberId}`
            );
            window.location.reload();
          }
        });
    } catch (err: any) {
      console.log(err);
    }
  }
}
