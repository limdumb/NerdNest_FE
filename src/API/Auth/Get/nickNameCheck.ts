import axios from "axios";
import { baseInstance } from "../../Instance/Instance";

export default async function nickNameCheck(nickName: string) {
  if(nickName.length > 2){
    try {
      await baseInstance.get(`/members/check?${nickName}`).then((res) => {
        if (res.status === 200) {
          alert("사용 가능한 닉네임 입니다 🙆🏻");
        }
      });
    } catch (err) {
      if (err === 409) {
        alert("중복된 닉네임 입니다 다른 닉네임을 사용 해주세요 ❗️")
      }
    }
  } else {
    alert("닉네임을 다시 확인해주세요!❗️")
  }
}
