import { ChangeEventHandler } from "react";
import styled from "styled-components";
import "./Style/commonInput.css";

interface InputProps {
  width?: string;
  height?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: "text" | "password" | "email";
  placeholder:
    | "이메일을 입력하세요"
    | "비밀번호를 입력하세요"
    | "닉네임을 입력하세요"
    | "제목을 입력하세요";
  radius?: string;
}

interface Props extends InputProps {
  label?: "닉네임" | "H1" | "비밀번호 확인" | "비밀번호";
  name?: string;
}

const Input = styled.input<InputProps>`
  width: ${(props) => (props.width ? props.width : {})};
  height: ${(props) => (props.height ? props.height : {})};
  border: 1px solid gray;
  border-radius: ${(props) => (props.radius ? props.radius : "none")};
  padding-left: 5px;
  ::placeholder {
    color: #999;
  }
`;

export default function CommonInput(props: Props) {
  return (
    <div className="Input_Container">
      <label className="Input_Label">
        {props.type === "email" ? "이메일" : props.label}
      </label>
      <Input
        name={props.name}
        radius={props.radius}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        width={props.width}
        height={props.height}
      />
    </div>
  );
}