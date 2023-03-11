import { NavigateFunction } from "react-router-dom";
import { baseInstance } from "../../Instance/Instance";

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
      await baseInstance
        .patch(`/members/${params.memberId}`, request)
        .then((res) => {
          if (res.status === 200) {
            alert("수정이 완료 되었습니다!");
            params.navigate(
              `/${params.nickName}/${params.memberId}/전체/${params.categoryId}`
            );
            window.location.reload();
          }
        });
    } catch (err: any) {
      if (err.response.status === 409) {
        alert("닉네임이 중복 되었습니다.");
      } else if (err.response.status === 400) {
        alert("정보가 잘못 되었습니다 다시 진행해주세요!");
      }
    }
  } else {
    alert("닉네임을 입력해주세요!");
  }
}
