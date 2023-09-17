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
      days.push({
        day: i,
        isCurrentMonth: true,
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

    return days;
  };

  
  return (
    <div data-testid="calendar-container" className="calendar-container">
      <Week daysOfWeek={daysOfWeek} />
      <Divider />

      <Days days={getDaysInMonth(date)} />
    </div>
  );
}

export default Calendar;
