import { DayType } from "../types";

export const classes = (...args: (string | undefined)[]) =>
  args.filter(Boolean).join(" ");

export const newDateKo = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff);
  return korNow;
};

const onPrevMonthCheck = (month: number) => {
  if (month === 0) {
    return 12;
  }
  return month;
};

const onNextMonthCheck = (month: number) => {
  if (month === 0) {
    return 12;
  }
  return month;
};

export const createDays = (date: Date) => {
  const days = [];
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  const firstDayOfWeek = firstDay.getDay();
  const lastDayOfWeek = lastDay.getDay();

  // 이전 달의 마지막 날짜를 추가
  for (
    let i = prevMonthLastDate - firstDayOfWeek + 1;
    i <= prevMonthLastDate;
    i++
  ) {
    days.push({
      day: i,
      isCurrentMonth: false,
      goToClick: "back",
      label: `${year}년 ${onPrevMonthCheck(month - 1)}월 ${i}일`,
    });
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const is토요일 = (firstDayOfWeek + i) % 7 === 0;
    const is일요일 = (firstDayOfWeek + i) % 7 === 1;
    days.push({
      day: i,
      isCurrentMonth: true,
      isWeekend: is토요일 || is일요일,
      weekendType: is토요일 ? "토" : is일요일 ? "일" : "평일",
      label: `${year}년 ${month}월 ${i}일`,
    });
  }

  if (lastDayOfWeek !== 6) {
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      days.push({
        day: i,
        goToClick: "forward",
        isCurrentMonth: false,
        label: `${year}년 ${onNextMonthCheck(month + 1)}월 ${i}일`,
      });
    }
  }
  return days as DayType[];
};
