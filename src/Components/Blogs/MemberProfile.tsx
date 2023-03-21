import { TiPen } from "react-icons/ti";
import { MemberType } from "../../Pages/Blogs";
import { Params, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import editMemberData from "../../API/Blogs/Patch/editMemberData";
import ImageUploader from "../Common/ImageUploader";
import { profileImageUploader } from "../../API/Blogs/Post/imageUploader";
import "./Style/memberProfile.css";

interface Props extends MemberType {
  memberId: string | null;
  setIsProfileEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isProfileEdit: boolean;
  params: Readonly<Params<string>>;
}

export default function MemberProfile({
  profileImageUrl,
  nickName,
  about,
  memberId,
  isProfileEdit,
  setIsProfileEdit,
  params,
}: Props) {
  const [memberEditValue, setMemberEditValue] = useState({
    nickName: nickName,
    about: about,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const memberEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberEditValue(() => ({
      ...memberEditValue,
      [e.target.name]: e.target.value,
    }));
    nickName = e.target.value;
    about = e.target.value;
  };
  const navigate = useNavigate();

  return (
    <>
      <div>
        {memberId === params.memberId ? (
          isProfileEdit ? (
            <TiPen
              className="Member_Profile_Edit"
              onClick={async () => {
                if (
                  memberEditValue.nickName.length !== 0 &&
                  memberEditValue.nickName.length > 2
                ) {
                  profileImageUploader(imageFile as File);
                  const successCode = await editMemberData({
                    nickName: memberEditValue.nickName,
                    about: memberEditValue.about,
                    memberId: parseInt(memberId),
                    categoryId: parseInt(params.categoryId as string),
                    categoryName: params.categoryName as string,
                  });
                  if (successCode === 200) {
                    navigate(`/${memberEditValue.nickName}/${memberId}`);
                    alert("프로필이 변경 되었습니다.");
                    window.location.reload();
                    setIsProfileEdit(!isProfileEdit);
                  }
                } else {
                  alert("닉네임을 입력해주세요!");
                }
              }}
            />
          ) : (
            <TiPen
              className="Member_Profile_Edit"
              onClick={() => setIsProfileEdit(!isProfileEdit)}
            />
          )
        ) : null}
      </div>
      {isProfileEdit ? (
        <>
          <ImageUploader
            usage="Profile"
            setImageFile={setImageFile}
            imageFile={imageFile}
            profileImageUrl={profileImageUrl}
          />
          <div className="Member_Profile_Content">
            <label className="Member_Label">닉네임:</label>
            <input
              className="Member_Edit_Input"
              name="nickName"
              defaultValue={memberEditValue.nickName}
              onChange={(e) => {
                memberEditHandler(e);
              }}
            />
            <label className="Member_Label">자기소개:</label>
            <input
              className="Member_Edit_Input"
              name="about"
              defaultValue={memberEditValue.about}
              onChange={(e) => {
                memberEditHandler(e);
              }}
            />
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
