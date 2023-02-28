import React, { ChangeEvent, useState } from "react";
import CommonInput from "../Components/Common/CommonInput";
import styled from "styled-components";
import "./Style/login.css";
import EventButton from "../Components/Common/EventButton";

const AuthContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 625px;
  height: 70%;
  padding: 20px 10px 20px 10px;
  background-color: var(--fc-300);
  margin-bottom: 40px;
  border-radius: var(--br-l);
  border: 1px solid black;
`;

const AuthWriteList = styled.ul<{ height: string }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: ${(props) => (props.height ? props.height : {})};
  padding-bottom: 100px;
`;

const OauthList = styled.ul`
  background-color: var(--fc-hv-500);
  width: 40%;
  height: 60px;
  gap: 10px;
  margin-bottom: 70px;
`;

interface LoginType {
  email: string;
  password: string;
}

const Login = () => {
  const [loginValue, setLoginValue] = useState<LoginType>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setLoginValue(() => ({
      ...loginValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AuthContent>
      <div>
        <h2>로그인</h2>
      </div>
      <AuthWriteList height="60%">
        <li className="Email_Input">
          <CommonInput
            radius="10px"
            name="email"
            value={loginValue.email}
            onChange={(e) => handleInputChange(e)}
            type={"email"}
            placeholder={"이메일을 입력하세요"}
          />
        </li>
        <li>
          <CommonInput
            radius={"10px"}
            name="password"
            value={loginValue.password}
            onChange={(e) => handleInputChange(e)}
            type={"password"}
            placeholder={"비밀번호를 입력하세요"}
          />
        </li>
      </AuthWriteList>
      <OauthList>
        <div></div>
        <div></div>
      </OauthList>
      <div>
        <EventButton usage="login" />
      </div>
    </AuthContent>
  );
};

export default Login;
