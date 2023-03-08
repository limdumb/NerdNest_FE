import { useState } from "react";
import { RxTriangleDown } from "react-icons/rx";
import logout from "../../API/Auth/Post/logout";
import "../Style/DropDownTab.css";

const DropDownTab = () => {
  const [isTab, setIsTab] = useState(false);
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
          <li className="DropDownTab_MyBlog Menu">내 블로그</li>
        </ul>
      ) : null}
    </>
  );
};

export default DropDownTab;
