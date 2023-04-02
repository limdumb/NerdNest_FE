import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import "react-tooltip/dist/react-tooltip.css";
import "./Style/blogRecord.css";

const RecordBlock = styled.div<{ day: boolean }>`
  width: 14px;
  height: 14px;
  background-color: ${(props) => (props.day ? "green" : "gray")};
  margin-top: 5px;
  border-radius: 2px;
`;

interface Props {
  memberId: string | undefined;
  blogRecord: { blogId: number; blogRecord: number }[];
  loading: boolean;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
}

const BlogRecord = (props: Props) => {
  const [hover, setHover] = useState(0);
  const dateByIndex = useMemo(() => calculateDateByIndex(hover), [hover]);
  const dayOfWeek = useMemo(() => getDayOfWeek(), [props.year]);
  const TotalDays = useMemo(() => getTotalDaysInYear(props.year), [props.year]);
  const [records, setRecords] = useState(
    new Array(TotalDays).fill({ day: null }).map((_, index) => {
      return { day: index + 1, blogId: null as number | null };
    })
  );

  useEffect(() => {
    if (!props.loading) {
      const newRecord = new Array(TotalDays)
        .fill({ day: null })
        .map((_, index) => {
          return { day: index + 1, blogId: null as number | null };
        });
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

  function getTotalDaysInYear(year: number) {
    if (year % 400 === 0) {
      return 366;
    } else if (year % 100 === 0) {
      return 365;
    } else if (year % 4 === 0) {
      return 366;
    } else {
      return 365;
    }
  }

  function calculateDateByIndex(index: number) {
    const startedDate = new Date(props.year, 0, 1);
    const delta = index * 24 * 60 * 60 * 1000;
    const recordDate = new Date(startedDate.getTime() + delta);
    return recordDate.toLocaleDateString();
  }

  function getDayOfWeek() {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const startedDate = new Date(props.year, 0, 1);
    const startedDay = new Date(startedDate).getDay();
    return [...week.slice(startedDay), ...week.slice(0, startedDay)];
  }

  return (
    <>
      <div className="Blog_Record_Year_Container">
        <GrFormPrevious
          cursor={"pointer"}
          onClick={() => props.setYear((year) => year - 1)}
        />
        {props.year}
        <GrFormNext
          cursor={"pointer"}
          onClick={() => props.setYear((year) => year + 1)}
        />
      </div>
      <div className="Blog_Record_Month_Container">
        {monthList.map((month) => (
          <span key={month} className="Blog_Record_Month_Content">
            {month}
          </span>
        ))}
      </div>
      <div className="Blog_Record_Body_Container">
        <div className="Blog_Record_Day_Container">
          {dayOfWeek.map((day) => (
            <span key={day} className="Blog_Record_Day_Content">
              {day}
            </span>
          ))}
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
      <Tooltip anchorSelect="#record-date" content={dateByIndex} />
    </>
  );
};

export default BlogRecord;
