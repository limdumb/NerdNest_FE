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
  height: 100%;
  padding: 20px 10px 20px 10px;
  background-color: var(--fc-300);
  margin-bottom: 40px;
`;

const AuthWriteList = styled.ul<{ height: string }>`
  background-color: var(--fc-hv-500);
  width: 100%;
  height: ${(props) => (props.height ? props.height : {})};
  margin-top: 30px;
  margin-bottom: 40px;
`;

const OauthList = styled.ul`
  background-color: var(--fc-hv-500);
  width: 40%;
  height: 60px;
  gap: 10px;
  margin-bottom: 30px;
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
      <AuthWriteList height="70%">
        <li>
          <CommonInput
            name="email"
            value={loginValue.email}
            onChange={(e) => handleInputChange(e)}
            type={"email"}
            placeholder={"이메일을 입력하세요"}
          />
        </li>
        <li>
          <CommonInput
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
        <EventButton usage="signUp" />
      </div>
    </AuthContent>
  );
};

export default Login;
