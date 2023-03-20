import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  usage: string;
}

const CommonButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  width: ${(props) =>
    props.usage === "login"
      ? "160px"
      : props.usage === "signUp"
      ? "160px"
      : props.usage === "write"
      ? "80px"
      : "120px"};
  height: 41px;
  border-radius: 15px;
  font-size: 18px;
  border: none;
  color: white;
  padding: 10px;
  background-color: ${(props) =>
    props.usage === "login"
      ? "#2D7DF5"
      : props.usage === "signUp"
      ? "#619BF2"
      : props.usage === "write"
      ? "#499FEF"
      : "#4489F1"};
  box-shadow: 1px 1px 1px 1px #7695c34a;
  &:hover {
    background-color: ${(props) =>
      props.usage === "login"
        ? "#2762BC"
        : props.usage === "signUp"
        ? "#477AC8"
        : props.usage === "write"
        ? "#3A88D1"
        : "#3A6EBE"};
  }
`;

export default function EventButton(props: ButtonProps) {
  return (
    <CommonButton {...props}>
      {props.usage === "login"
        ? "로그인"
        : props.usage === "edit"
        ? "수정"
        : props.usage === "signUp"
        ? "회원가입"
        : props.usage === "write"
        ? "작성"
        : props.usage}
    </CommonButton>
  );
}
