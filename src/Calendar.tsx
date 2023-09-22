import Week from "./components/Week";
import Divider from "./components/Divider";
import { useState } from "react";
import Days from "./components/Days";
import { createDays } from "./lib/utils";
import MonthViewBox from "./components/MonthViewBox";

function Calendar() {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const prevMonth = () => {
    const newDate = new Date(year, date.getMonth() - 1);
    setDate(newDate);
  };
  const nextMonth = () => {
    const newDate = new Date(year, date.getMonth() + 1);
    setDate(newDate);
  };
  const handleDayClick = () => {};

  return (
    <div data-testid="calendar-container" className="calendar-container">
      <MonthViewBox
        date={date}
        setDate={setDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <Week daysOfWeek={daysOfWeek} />
      <Divider />
      <Days days={createDays(date)} handleDayClick={handleDayClick} />
    </div>
  );
}

export default Calendar;
