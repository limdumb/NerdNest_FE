import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import "./Style/authTab.css";

interface TabProps {
  borderBtm: boolean;
  fontWeight: boolean;
}

const TabLinkList = styled.li<TabProps>`
  border-bottom: ${(props) => (props.borderBtm ? "2px solid black" : "none")};
  font-weight: ${(props) => (props.fontWeight ? "var(--fw-bold)" : {})};
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
              fontWeight={index === isTabActive}
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
