import "./Style/memberProfile.css";
import { TiPen } from "react-icons/ti";

interface Props {
  profileImageUrl: string
  nickName: string
  about: string
}

export default function MemberProfile(props:Props) {
  return (
    <>
    <TiPen className="Member_Profile_Edit"/>
      <img
        className="Member_Profile_Image"
        src={`${props.profileImageUrl}`}
      />
      <h2 className="Member_Profile_NickName">{props.nickName}</h2>
      <h4 className="Member_Profile_Content">{props.about}</h4>
    </>
  );
}
