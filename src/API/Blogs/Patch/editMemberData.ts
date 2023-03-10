import { baseInstance } from "../../Instance/Instance";

interface Params {
  nickName: string;
  about: string;
  memberId: number;
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
            window.location.reload()
          }
        });
    } catch (err: any) {
      if (err.response.status === 409) {
        alert("닉네임이 중복 되었습니다.");
      }
      console.error(err);
    }
  } else {
    alert("닉네임을 입력해주세요!");
  }
}
