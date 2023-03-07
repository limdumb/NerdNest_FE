import axios from "axios";

interface Params {
  profileImageUrl: string;
  nickName: string;
  about: string;
}

export default async function editMemberData(params: Params) {
  const request = JSON.stringify({
    profileImageUrl: params.profileImageUrl,
    nickName: params.nickName,
    about: params.about,
  });
  try {
    await axios.patch("url", request);
  } catch (err) {
    console.error(err);
  }
}
