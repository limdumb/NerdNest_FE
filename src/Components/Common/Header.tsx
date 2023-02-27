import { TiPencil } from "react-icons/ti";
import { RiSearchLine } from "react-icons/ri";
import "./Header.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginSignUpBtn = styled.button`
  background-color: transparent;

  &:hover {
    color: var(--fc-hv-500);
  }
`;

export default function Header() {
  return (
    <div className="Header_Wrapper">
      <div className="Header_Container">
        <Link to="/">
          <div className="Header_LogoContainer" />
        </Link>
        <div className="Header_ManageContainer">
          <Link to="/write">
            <TiPencil className="Pencil icon" />
          </Link>
          <Link to="/search">
            <RiSearchLine className="Search icon" />
          </Link>
          <div className="Header_Login_SignUp_Container">
            <Link to="/login">
              <LoginSignUpBtn>로그인</LoginSignUpBtn>
            </Link>
            /
            <Link to="/signup">
              <LoginSignUpBtn>회원가입</LoginSignUpBtn>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
