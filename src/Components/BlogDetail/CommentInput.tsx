import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface CommentInputType {
  width: string;
  height?: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  marginLeft?: string;
  marginBottom?: string;
  defaultValue?: string;
}

const CommentStyledInput = styled.textarea<CommentInputType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  resize: none;
  padding: 10px;
  border: 1px solid var(--hr-500);
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "")};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : "")};
  border-radius: var(--br-m);

  &:focus {
    outline-color: var(--blue-300);
  }
`;

const CommentInput = (props: CommentInputType) => {
  return (
    <>
      <CommentStyledInput
        width={props.width}
        height={props.height}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        marginLeft={props.marginLeft}
        marginBottom={props.marginBottom}
        defaultValue={props.defaultValue}
      ></CommentStyledInput>
    </>
  );
};

export default CommentInput;
