export function calculateDateByIndex(year: number, index: number) {
  const startedDate = new Date(year, 0, 1);
  const delta = index * 24 * 60 * 60 * 1000;
  const recordDate = new Date(startedDate.getTime() + delta);
  return recordDate.toLocaleDateString();
}
