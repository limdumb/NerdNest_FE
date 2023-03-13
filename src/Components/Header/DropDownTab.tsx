import { useState } from "react";
import { RxTriangleDown } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import logout from "../../API/Auth/Post/logout";
import "../Style/DropDownTab.css";

const DropDownTab = () => {
  const [isTab, setIsTab] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  return (
    <>
      <RxTriangleDown
        className="Profile_Tab icon"
        onClick={() => setIsTab(!isTab)}
      />
      {isTab ? (
        <ul className="DropDownTab_Container">
          <li
            className="DropDownTab_Logout Menu"
            onClick={() => {
              logout(accessToken);
            }}
          >
            로그아웃
          </li>
          <li className="DropDownTab_MyBlog Menu" onClick={() => navigate(`/`)}>
            내 블로그
          </li>
        </ul>
      ) : null}
    </>
  );
};

export default DropDownTab;
