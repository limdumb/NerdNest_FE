import axios from "axios";
interface MemberType {
  profileImageUrl: string;
  nickName: string;
  about: string;
}

export default async function getMemberData(memberId: number) {
  try {
    const response = await axios.get<MemberType>(`/members/${memberId}`);
    return response;
  } catch (err) {
    console.error(err);
  }
}

//멤버데이터 수정부터 하면됨