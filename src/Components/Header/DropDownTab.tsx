import { useState } from "react";
import { RxTriangleDown } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import logout from "../../API/Auth/Post/logout";
import "./Style/DropDownTab.css";

const DropDownTab = ({
  memberId,
  nickName,
}: {
  memberId: number;
  nickName: string;
}) => {
  const [isTab, setIsTab] = useState(false);
  const navigate = useNavigate();

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
              logout();
            }}
          >
            로그아웃
          </li>
          <li
            className="DropDownTab_MyBlog Menu"
            onClick={() => {
              navigate(`/${nickName}/${memberId}`);
              setIsTab(!isTab);
            }}
          >
            내 블로그
          </li>
        </ul>
      ) : null}
    </>
  );
};

export default DropDownTab;
