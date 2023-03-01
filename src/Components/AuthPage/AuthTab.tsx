import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import "./Style/authTab.css";

interface TabProps {
  borderBtm: boolean;
  fontsize: boolean;
}

const TabLinkList = styled.li<TabProps>`
  border-bottom: ${(props) => (props.borderBtm ? "2px solid black" : "none")};
  font-size: ${(props)=> (props.fontsize ? "20px" : "15px")};
`;

export default function AuthTab() {
  const [isTabActive, setIsTabActive] = useState(0);

  const AuthArr = [
    {
      tabTitle: "로그인",
      tabNavigate: "/auth/login",
    },
    {
      tabTitle: "회원가입",
      tabNavigate: "/auth/signup",
    },
  ];
  return (
    <ul className="Auth_Tab_List">
      {AuthArr.map((el, index) => {
        return (
          <Link key={index} to={el.tabNavigate}>
            <TabLinkList
              onClick={() => setIsTabActive(index)}
              fontsize={index === isTabActive}
              borderBtm={index === isTabActive}
            >
              {el.tabTitle}
            </TabLinkList>
          </Link>
        );
      })}
    </ul>
  );
}
