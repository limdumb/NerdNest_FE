import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import "./Style/blogRecord.css";
import "react-tooltip/dist/react-tooltip.css";

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
  year: number;
}

const BlogRecord = (props: Props) => {
  const [records, setRecords] = useState(
    Array(365)
      .fill({ day: null })
      .map((_, index) => {
        return { day: index + 1, blogId: null as number | null };
      })
  );
  const [hover, setHover] = useState(0);
  useEffect(() => {
    if (!props.loading) {
      const newRecord = [...records];
      props.blogRecord.forEach((record) => {
        const dayIndex = record.blogRecord - 1;
        newRecord[dayIndex] = {
          day: record.blogRecord,
          blogId: record.blogId,
        };
      });
      setRecords(newRecord);
    }
  }, [props.blogRecord]);

  const monthList = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  function calculateDateByIndex(index: number) {
    const startedDate = new Date(props.year, 0, 1);
    const delta = index * 24 * 60 * 60 * 1000;
    const recordDate = new Date(startedDate.getTime() + delta);
    return recordDate.toLocaleDateString();
  }
  return (
    <>
      <div className="Blog_Record_Month_Container">
        {monthList.map((month) => (
          <span key={month} className="Blog_Record_Month_Content">
            {month}
          </span>
        ))}
      </div>
      <div className="Blog_Record_Body_Container">
        <div className="Blog_Record_Day_Container">
          <span className="Blog_Record_Day_Content">월</span>
          <span className="Blog_Record_Day_Content">수</span>
          <span className="Blog_Record_Day_Content">금</span>
        </div>
        <div className="Blog_Record_Table_Container">
          {records &&
            records.map(({ blogId, day }, idx) => {
              return (
                <span key={day}>
                  <RecordBlock
                    id="record-date"
                    day={blogId !== null}
                    onMouseEnter={() => setHover(idx)}
                  />
                </span>
              );
            })}
        </div>
      </div>
      <Tooltip
        anchorSelect="#record-date"
        content={calculateDateByIndex(hover)}
      />
    </>
  );
};

export default BlogRecord;
