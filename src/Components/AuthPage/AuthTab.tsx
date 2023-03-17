import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Style/authTab.css";

const TabLinkList = styled.li`
  font-weight: var(--fw-bold);
`;

export default function AuthTab() {
  const [isTabActive, setIsTabActive] = useState(1);

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
            >
              {el.tabTitle}
            </TabLinkList>
          </Link>
        );
      })}
    </ul>
  );
}
