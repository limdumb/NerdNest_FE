import { TiPen } from "react-icons/ti";
import { MemberType } from "../../Pages/Blogs";
import { FcPlus } from "react-icons/fc";
import "./Style/memberProfile.css";

interface Props extends MemberType {
  memberId: string | null;
  setIsProfileEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isProfileEdit: boolean;
}

export default function MemberProfile({
  profileImageUrl,
  nickName,
  about,
  memberId,
  isProfileEdit,
  setIsProfileEdit,
}: Props) {
  return (
    <>
      {memberId ? (
        <TiPen
          className="Member_Profile_Edit"
          onClick={() => setIsProfileEdit(!isProfileEdit)}
        />
      ) : null}
      {isProfileEdit ? (
        <>
          <FcPlus className="Profile_Image_Edit_Icon" />
          <img className="Member_Profile_Image" src={`${profileImageUrl}`} />
          <div className="Member_Profile_Content">
            <label className="Member_Label">닉네임:</label>
            <div>
              <input className="Member_Edit_Input" />
              <button className="Member_Edit_Submit">확인</button>
            </div>
            <label className="Member_Label">자기소개:</label>
            <div>
              <input className="Member_Edit_Input" />
              <button className="Member_Edit_Submit">확인</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <img className="Member_Profile_Image" src={`${profileImageUrl}`} />
          <h2 className="Member_Profile_NickName">{nickName}</h2>
          <h4 className="Member_Profile_Content">{about}</h4>
        </>
      )}
    </>
  );
}
