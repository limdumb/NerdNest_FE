export function getTotalDaysInYear(year: number) {
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