export function getDayOfWeek(year: number) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const startedDate = new Date(year, 0, 1);
  const startedDay = new Date(startedDate).getDay();
  return [...week.slice(startedDay), ...week.slice(0, startedDay)];
}
