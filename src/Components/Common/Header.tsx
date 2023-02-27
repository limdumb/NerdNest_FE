import { TiPencil } from "react-icons/ti";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Style/Header.css";

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
              <div className="Header_Login btn">로그인</div>
            </Link>
            &nbsp;/&nbsp; 
            <Link to="/signup">
              <div className="Header_SignUp btn">회원가입</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
