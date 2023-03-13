import { ChangeEvent, useState } from "react";
import CommonInput from "../Components/Common/CommonInput";
import styled from "styled-components";
import EventButton from "../Components/Common/EventButton";
import { Wrapper } from "./Blogs";
import login from "../API/Auth/Post/login";
import { useNavigate } from "react-router-dom";

export const AuthContent = styled(Wrapper)`
  align-items: center;
  width: 625px;
  height: 670px;
  padding: 20px 10px;
  background-color: var(--fc-300);
  margin-bottom: 40px;
  border-radius: var(--br-l);
  border: 1px solid black;
  justify-content: space-between;
`;

export const AuthWriteList = styled.ul<{ height: string; paddingBtm: string }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: ${(props) => (props.height ? props.height : {})};
  padding-bottom: ${(props) => (props.paddingBtm ? props.paddingBtm : {})};
  & > li {
    margin-bottom: 15px;
    height: 89px;
  }
  margin-top: 10px;
`;

export const ErrorSpan = styled.span<{ color?: boolean }>`
  margin-top: 10px;
  color: ${(props) => (props.color ? "var(--blue-hv-400)" : "red")};
`;

export const OauthList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--fc-hv-500);
  width: 40%;
  height: 60px;
  gap: 30px;
  margin-bottom: 30px;
`;

export const ButtonWrapper = styled.div`
  margin-bottom: 20px;
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
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const navigate = useNavigate();

  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValue(() => ({
      ...loginValue,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "email") {
      if (e.target.value.length === 0) {
        setEmailErrorMessage("이메일을 입력해 주세요");
      } else if (!emailRegex.test(e.target.value)) {
        setEmailErrorMessage("이메일 형식이 아닙니다");
      } else {
        setEmailErrorMessage("");
      }
    }
  };

  return (
    <AuthContent>
      <h2>로그인</h2>
      <AuthWriteList height="438px" paddingBtm="50px">
        <li>
          <CommonInput
            height="44px"
            radius="var(--br-m)"
            name="email"
            value={loginValue.email}
            onChange={(e) => handleInputChange(e)}
            type={"email"}
            placeholder={"이메일을 입력하세요"}
          />
          <ErrorSpan>{emailErrorMessage}</ErrorSpan>
        </li>
        <li>
          <CommonInput
            label="비밀번호"
            height="44px"
            radius="var(--br-m)"
            name="password"
            value={loginValue.password}
            onChange={(e) => handleInputChange(e)}
            type="password"
            placeholder={"비밀번호를 입력하세요"}
          />
        </li>
      </AuthWriteList>
      {/* oauth 들어올 예정 */}
      <OauthList>
        <div></div>
        <div></div>
      </OauthList>
      <ButtonWrapper>
        <EventButton
          usage="login"
          disabled={!emailRegex.test(loginValue.email)}
          onClick={() => {
            login({
              email: loginValue.email,
              password: loginValue.password,
              navigate: navigate,
            });
          }}
        />
      </ButtonWrapper>
    </AuthContent>
  );
};

export default Login;
