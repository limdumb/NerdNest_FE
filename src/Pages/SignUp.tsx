import React, { ChangeEvent, useState } from "react";
import CommonInput from "../Components/Common/CommonInput";
import EventButton from "../Components/Common/EventButton";
import {
  AuthContent,
  AuthWriteList,
  OauthList,
  ErrorSpan,
  ButtonWrapper,
} from "./Login";

interface SignUpType {
  email: string;
  nickName: string;
  password: string;
  passwordCheck: string;
}

const SignUp = () => {
  const [signUpValue, setSignUpValue] = useState<SignUpType>({
    email: "",
    nickName: "",
    password: "",
    passwordCheck: "",
  });
  // 추후에 상태값 변경 예정
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [nickNameErrorMessage, setNickNameErrorMessage] = useState<string>("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");

  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const nickNameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{6,10}$/;

  const passEmailValue = emailRegex.test(signUpValue.email);
  const passNickNameValue = nickNameRegex.test(signUpValue.nickName);
  const passPasswordValue = passwordRegex.test(signUpValue.password);
  const passwordCheckValue = signUpValue.password === signUpValue.passwordCheck;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpValue(() => ({
      ...signUpValue,
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

    if (e.target.name === "nickName") {
      if (e.target.value.length === 0) {
        setNickNameErrorMessage("닉네임을 입력하세요");
      } else if (!nickNameRegex.test(e.target.value)) {
        setNickNameErrorMessage(
          "2자리 이상 10자리 이하 특수문자 불가능 입니다."
        );
      } else {
        setNickNameErrorMessage("");
      }
    }

    if (e.target.name === "password") {
      if (e.target.value.length === 0) {
        setPasswordErrorMessage("비밀번호를 입력해 주세요");
      } else if (!passwordRegex.test(e.target.value)) {
        setPasswordErrorMessage(
          "영문 숫자 특수문자 포함 6자리 이상 10자리 이하 입니다."
        );
      } else {
        setPasswordErrorMessage("");
      }
    }

    if (e.target.name === "passwordCheck") {
      if (signUpValue.password !== e.target.value) {
        setPasswordCheckMessage("비밀번호가 일치하지 않습니다");
      } else {
        setPasswordCheckMessage("비밀번호가 일치합니다!");
      }
    }
  };

  return (
    <AuthContent>
      <h2>회원가입</h2>
      <AuthWriteList height="438px" paddingBtm="10px">
        <li>
          <CommonInput
            height="44px"
            radius="var(--br-m)"
            name="email"
            value={signUpValue.email}
            onChange={(e) => {
              handleInputChange(e);
            }}
            type={"email"}
            placeholder={"이메일을 입력하세요"}
          />
          <ErrorSpan>{emailErrorMessage}</ErrorSpan>
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
          <ErrorSpan>{nickNameErrorMessage}</ErrorSpan>
        </li>
        <li>
          <CommonInput
            label="비밀번호"
            height="44px"
            radius="var(--br-m)"
            name="password"
            value={signUpValue.password}
            onChange={(e) => handleInputChange(e)}
            type={"password"}
            placeholder={"비밀번호를 입력하세요"}
          />
          <ErrorSpan>{passwordErrorMessage}</ErrorSpan>
        </li>
        <li>
          <CommonInput
            label="비밀번호 확인"
            height="44px"
            radius="var(--br-m)"
            name="passwordCheck"
            value={signUpValue.passwordCheck}
            onChange={(e) => handleInputChange(e)}
            type={"password"}
            placeholder={"비밀번호를 입력하세요"}
          />
          <ErrorSpan>{passwordCheckMessage}</ErrorSpan>
        </li>
      </AuthWriteList>
      {/* oauth 들어올 예정 */}
      <OauthList>
        <div></div>
        <div></div>
      </OauthList>
      <ButtonWrapper>
        <EventButton
          usage="signUp"
          onClick={() => console.log("로그인 로직 예정")}
          disabled={
            !(
              passEmailValue &&
              passNickNameValue &&
              passPasswordValue &&
              passwordCheckValue
            )
          }
        />
      </ButtonWrapper>
    </AuthContent>
  );
};

export default SignUp;
