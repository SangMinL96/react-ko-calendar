import Week from "./components/Week";
import Divider from "./components/Divider";
import { useState } from "react";
import Days from "./components/Days";

function Calendar() {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
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
      });
    }

    if (lastDayOfWeek !== 6) {
      for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
        days.push({
          day: i,
          isCurrentMonth: false,
        });
      }
    }
    return days as {
      day: number;
      isCurrentMonth: boolean;
      isWeekend: boolean;
      weekendType: "일" | "토" | "평일";
    }[];
  };

  const prevMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1);
    setDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1);
    setDate(newDate);
  };
  return (
    <div data-testid="calendar-container" className="calendar-container">
      <button type="button" onClick={() => nextMonth()}>
        {`${date.getFullYear()}년 ${date.getMonth()}월`}
      </button>
      <Week daysOfWeek={daysOfWeek} />
      <Divider />
      <Days days={getDaysInMonth(date)} />
    </div>
  );
}

export default Calendar;
