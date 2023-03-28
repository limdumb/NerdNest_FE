import { useEffect, useState } from "react";
import styled from "styled-components";
import useFetch from "../../Custom Hook/useFetch";
import "./Style/blogRecord.css";

const RecordBlock = styled.div<{ day: boolean }>`
  width: 11px;
  height: 11px;
  background-color: ${(props) => (props.day ? "green" : "gray")};
  margin-top: 3px;
  border-radius: 2px;
`;

interface Props {
  memberId: string | undefined;
  blogRecord: { blogId: number; blogRecord: number }[];
  loading: boolean;
}

const BlogRecord = (props: Props) => {
  const [records, setRecords] = useState(
    Array(365)
      .fill({ day: null })
      .map((_, index) => {
        return { day: index + 1, blogId: null as number | null };
      })
  );

  useEffect(() => {
    if (!props.loading) {
      const newRecord = [...records];
      props.blogRecord.forEach((record) => {
        console.log(record);
        const dayIndex = record.blogRecord - 1;
        newRecord[dayIndex] = {
          day: record.blogRecord,
          blogId: record.blogId,
        };
      });
      setRecords(newRecord);
    }
  }, [props.blogRecord]);

  return (
    <div className="Blog_Record_Container">
      {records.map((allRecord) => {
        return (
          <RecordBlock key={allRecord.day} day={allRecord.blogId !== null} />
        );
      })}
    </div>
  );
};

export default BlogRecord;
