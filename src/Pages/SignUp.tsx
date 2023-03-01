import React, { ChangeEvent, useState } from "react";
import CommonInput from "../Components/Common/CommonInput";
import EventButton from "../Components/Common/EventButton";
import { AuthContent, AuthWriteList, OauthList } from "./Login";

interface SignUpType {
  email: string;
  nickName: string;
  password: string;
  passwordCheck: string
}

const SignUp = () => {
  const [signUpValue, setSignUpValue] = useState<SignUpType>({
    email: "",
    nickName: "",
    password: "",
    passwordCheck: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setSignUpValue(() => ({
      ...signUpValue,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <AuthContent>
      <h2>회원가입</h2>
      <AuthWriteList height="60%" paddingBtm="10px">
        <li>
          <CommonInput
            height="44px"
            radius="var(--br-m)"
            name="email"
            value={signUpValue.email}
            onChange={(e) => handleInputChange(e)}
            type={"email"}
            placeholder={"이메일을 입력하세요"}
          />
        </li>
        <li>
          <CommonInput
            label="닉네임"
            height="44px"
            radius="var(--br-m)"
            name="nickName"
            value={signUpValue.nickName}
            onChange={(e) => handleInputChange(e)}
            type={"text"}
            placeholder={"닉네임을 입력하세요"}
          />
        </li>
        <li>
          <CommonInput
            height="44px"
            radius="var(--br-m)"
            name="password"
            value={signUpValue.password}
            onChange={(e) => handleInputChange(e)}
            type={"password"}
            placeholder={"비밀번호를 입력하세요"}
          />
        </li>
        <li>
          <CommonInput
            label="비밀번호 확인"
            height="44px"
            radius="var(--br-m)"
            name="passwordCheck"
            value={signUpValue.passwordCheck}
            onChange={(e) => handleInputChange(e)}
            type={"text"}
            placeholder={"비밀번호를 입력하세요"}
          />
        </li>
      </AuthWriteList>
      {/* oauth 들어올 예정 */}
      <OauthList>
        <div></div>
        <div></div>
      </OauthList>
      <div>
        <EventButton
          usage="signUp"
          onClick={() => console.log("로그인 로직 예정")}
        />
      </div>
    </AuthContent>
  );
};

export default SignUp;
