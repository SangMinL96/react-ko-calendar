import Week from "./components/Week";
import Divide from "./components/Divide";
import { useCallback, useEffect, useState } from "react";
import Days from "./components/Days";
import { createDays } from "./lib/utils";
import MonthViewBox from "./components/MonthViewBox";
import convert from 'xml-js'

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

  const koDataFetch = useCallback(
    async ({ year, month }: { year: number; month: number }) => {
      try {
        const key =
          "RuisYCPqCgrosEWifzLwNKy0uKJfIJRsi2P1oTajDmnKKVHLSl%2B5OiOxuoTJy%2FlV3Lrk%2B0AucvB5TV%2FJ55ynUQ%3D%3D";
        const res = await fetch(
          `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getAnniversaryInfo?serviceKey=${key}&solYear=${year}&solMonth=0${month}`
        );
        console.log(res)
        const result = await res.json();
        var result1 = convert.xml2json(result, {compact: false, spaces: 4});
        console.log(result1);
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  useEffect(() => {
    koDataFetch({ year, month });
  }, [koDataFetch, year, month]);
  return (
    <div data-testid="calendar-container" className="calendar-container">
      <MonthViewBox
        date={date}
        setDate={setDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <Week daysOfWeek={daysOfWeek} />
      <Divide />
      <Days days={createDays(date)} handleDayClick={handleDayClick} />
    </div>
  );
}

export default Calendar;
