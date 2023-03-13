import { TiPencil } from "react-icons/ti";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DropDownTab from "./DropDownTab";
import "../Style/Header.css";
import { useEffect, useState } from "react";
import { baseInstance } from "../../API/Instance/Instance";

export const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 25px;
  margin-left: 7px;
  cursor: pointer;
`;

export default function Header() {
  const memberId = localStorage.getItem("memberId");
  const [profileData, setProfileData] = useState({
    profileImageUrl: "",
    nickName: "",
  });
  const { profileImageUrl, nickName } = profileData;
  useEffect(() => {
    const getPropfileData = async () => {
      await baseInstance
        .get(`/members/${memberId}`)
        .then((res) => {
          setProfileData({
            profileImageUrl: res.data.profileImageUrl,
            nickName: res.data.nickName,
          });
        })
        .catch((err) => console.error(err));
    };
    getPropfileData();
  }, [profileImageUrl]);

  return (
    <header className="Header_Wrapper">
      <div className="Header_Container">
        <Link to="/?tab=newest&page=1">
          <div className="Header_LogoContainer" />
        </Link>
        <div
          className={
            memberId
              ? "Header_ManageContainer isLogin"
              : "Header_ManageContainer"
          }
        >
          <Link to="/write">
            <TiPencil className="Pencil icon" />
          </Link>
          <Link to="/search">
            <RiSearchLine className="Search icon" />
          </Link>
          <div className="Header_Login_SignUp_Container">
            {memberId ? (
              <>
                <ProfileImage src={profileImageUrl} alt="memberImage" />
                <span className="Header_NickName_Container">{nickName}</span>
                <DropDownTab memberId={Number(memberId)} nickName={nickName} />
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <div className="Header_Login btn">로그인</div>
                </Link>
                &nbsp;/&nbsp;
                <Link to="/auth/signup">
                  <div className="Header_SignUp btn">회원가입</div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
