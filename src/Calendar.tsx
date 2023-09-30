import Week from "./components/Week";
import Divide from "./components/Divide";
import { useCallback, useEffect, useState } from "react";
import Days from "./components/Days";
import { createDays } from "./lib/utils";
import MonthViewBox from "./components/MonthViewBox";
import xml2js from "xml2js";

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

  const getRestDeInfo = useCallback(
    async ({ year, month }: { year: number; month: number }) => {
      try {
        const key = process.env.REACT_APP_KEY;
        const xhr = new XMLHttpRequest();
        const url =
          "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo"; /*URL*/
        let queryParams = `?serviceKey=${key}&solYear=${year}&solMonth=0${month}`;
        xhr.open("GET", url + queryParams);
        xhr.onreadystatechange = function () {
          if (this.readyState === 4) {
            xml2js.parseString(this.responseText, (err, result) => {
              if (err) {
                console.error("XML 파싱 오류:", err);
              } else {
                // JSON 데이터를 상태에 저장합니다.
                console.log(result);
              }
            });
          }
        };
        xhr.send("");
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  useEffect(() => {
    getRestDeInfo({ year, month });
  }, [getRestDeInfo, year, month]);
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
