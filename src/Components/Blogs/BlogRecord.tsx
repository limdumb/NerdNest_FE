import styled from "styled-components";
import "./Style/blogRecord.css";

const Record = styled.div<{ backColor: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.backColor ? "green" : "gray")};
`;

export default function BlogRecord() {
  //추후 데이터에 맞춘 props처리 예정
  //추후 데이터에 맞춘 처리 예정
  const arrayData: boolean[] = Array(365).fill(false);
  return (
    <>
      <h2>나의 블로그 기록</h2>
      <div className="Blog_Record_Box">
        {arrayData.map((el: boolean, index) => {
          return <Record backColor={el} key={index}>d</Record>;
        })}
      </div>
    </>
  );
}
