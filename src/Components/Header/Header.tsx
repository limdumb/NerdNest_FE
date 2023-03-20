import { TiPencil } from "react-icons/ti";
import { RiSearchLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DropDownTab from "./DropDownTab";
import { useCallback, useEffect, useState } from "react";
import { baseInstance } from "../../API/Instance/Instance";
import "./Style/Header.css";

export const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 25px;
  margin-left: 7px;
  cursor: pointer;
`;

export default function Header() {
  const memberId = Number(localStorage.getItem("memberId"));
  const [profileData, setProfileData] = useState({
    profileImageUrl: "",
    nickName: "",
  });
  const { profileImageUrl, nickName } = profileData;
  const navigate = useNavigate();

  const getProfileCallback = useCallback(() => {
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
  }, [profileData]);

  useEffect(() => {
    if (memberId) getProfileCallback();
  }, []);

  const handleWrite = () => {
    if (memberId) navigate(`write`);
    else {
      alert("로그인 후 사용해주세요.");
      navigate(`auth/login`);
    }
  };
  return (
    <header className="Header_Wrapper">
      <div className="Header_Container">
        <Link to="/">
          <div className="Header_LogoContainer">
            <img src={process.env.PUBLIC_URL + "/HeaderLogo.svg"} />
          </div>
        </Link>
        <div
          className={
            memberId
              ? "Header_ManageContainer isLogin"
              : "Header_ManageContainer"
          }
        >
          <a>
            <TiPencil className="Pencil icon" onClick={handleWrite} />
          </a>
          <Link to="/search">
            <RiSearchLine className="Search icon" />
          </Link>
          <div className="Header_Login_SignUp_Container">
            {memberId ? (
              <>
                <ProfileImage
                  src={profileImageUrl}
                  alt="memberImage"
                  onClick={() => navigate(`/${nickName}/${memberId}`)}
                />
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
