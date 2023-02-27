import { TiPencil } from "react-icons/ti";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Style/Header.css";
import { useState } from "react";
import DropDownTab from "../DropDownTab";

export default function Header() {
  const [isLogin, setIsLogin] = useState(true);
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
            {isLogin ? (
              <>
                <img
                  className="Header_Member_Image"
                  src="https://images.unsplash.com/photo-1676824469794-9d8deeaf1f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="memberImage"
                />
                <DropDownTab />
              </>
            ) : (
              <>
                <Link to="/login">
                  <div className="Header_Login btn">로그인</div>
                </Link>
                &nbsp;/&nbsp;
                <Link to="/signup">
                  <div className="Header_SignUp btn">회원가입</div>
                </Link>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
