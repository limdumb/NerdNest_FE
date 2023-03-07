import { useState } from "react";
import { RxTriangleDown } from "react-icons/rx";
import "../Style/DropDownTab.css";

const DropDownTab = () => {
  const [isTab, setIsTab] = useState(false);
  return (
    <>
      <RxTriangleDown
        className="Profile_Tab icon"
        onClick={() => setIsTab(!isTab)}
      />
      {isTab ? (
        <ul className="DropDownTab_Container">
          <li className="DropDownTab_Logout Menu">로그아웃</li>
          <li className="DropDownTab_MyBlog Menu">내 블로그</li>
        </ul>
      ) : null}
    </>
  );
};

export default DropDownTab;
