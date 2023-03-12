import styled from "styled-components";

interface CommentStyledSpanProps {
  usage?: string;
}

export const CommentSpan = styled.span<CommentStyledSpanProps>`
  color: ${(props) =>
    props.usage === "date" ? "var(--fc-400)" : "var(--fc-500)"};
  font-size: ${(props) =>
    props.usage === "date" ? "var(--font-sm)" : "var(--font-base)"};
  font-weight: ${(props) => (props.usage === "write" ? "var(--fw-bold)" : "")};
  margin-left: 0.5rem;
  cursor: ${(props) => (props.usage === "write" ? "pointer" : "")};
  &:hover {
    color: ${(props) => (props.usage === "write" ? "var(--fc-400)" : "")};
  }
`;

interface CommentStyledButtonProps {
  usage?: string;
}

export const CommentCommonBtn = styled.button<CommentStyledButtonProps>`
  position: relative;
  bottom: ${(props) => (props.usage === "edit" ? "" : "1.3rem")};
  left: ${(props) => (props.usage === "edit" ? "" : "32.9rem")};
  width: 60px;
  height: 30px;
  background-color: var(--blue-200);
  color: var(--fc-300);
  border-radius: var(--br-m);
  margin-left: 5px;

  &:hover {
    background-color: var(--blue-300);
  }
`;
