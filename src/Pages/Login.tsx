import { ChangeEvent, useState } from "react";
import CommonInput from "../Components/Common/CommonInput";
import styled from "styled-components";
import EventButton from "../Components/Common/EventButton";
import { Wrapper } from "./Blogs";

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

export const ErrorSpan = styled.span<{ color?: "비밀번호가 일치합니다!" }>`
  margin-top: 10px;
  color: ${(props) => (props.color ? "var(--blue-hv-400)" : "red")};
`;

export const OauthList = styled.ul`
  background-color: var(--fc-hv-500);
  width: 40%;
  height: 60px;
  gap: 10px;
  margin-bottom: 30px;
`;

export const ButtonWrapper = styled.div`
margin-bottom : 20px;
`

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
      <h2>로그인</h2>
      <AuthWriteList height="438px" paddingBtm="80px">
        <li>
          <CommonInput
            radius="var(--br-m)"
            name="email"
            value={loginValue.email}
            onChange={(e) => handleInputChange(e)}
            type={"email"}
            placeholder={"이메일을 입력하세요"}
          />
        </li>
        <li>
          <CommonInput
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
          onClick={() => console.log("로그인 로직 예정")}
        />
      </ButtonWrapper>
    </AuthContent>
  );
};

export default Login;
