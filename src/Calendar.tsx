import { useEffect, useRef, useState } from "react";
import Days from "./components/Days";
import Divide from "./components/Divide";
import MonthViewBox from "./components/MonthViewBox";
import Week from "./components/Week";
import { useSpecialDayData } from "./hooks/useSpecialDayData";
import { createDays } from "./lib/utils";
import { useSwiper } from "./hooks/useSwiper";

function Calendar() {
  const { draggable, onSwipe } = useSwiper();

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const domRef = useRef<any>(null);
  function scrollHandler(e: any) {
    const atSnappingPoint = e.target.scrollLeft % e.target.offsetWidth === 0;
    const timeOut = atSnappingPoint ? 0 : 150; //see notes

    clearTimeout(e.target.scrollTimeout); //clear previous timeout

    e.target.scrollTimeout = setTimeout(function () {
      //using the timeOut to evaluate scrolling state
      if (!timeOut) {
        console.log("Scroller snapped!");
        console.log(e.target.scrollLeft);
      } else {
        console.log("User stopped scrolling.");
      }
    }, timeOut);
  }

  useEffect(() => {
    const myElement = document.getElementById("scroller");
    if (myElement) {
      myElement.addEventListener("scroll", scrollHandler);
    }
  }, []);
  const sData = useSpecialDayData({ year, month });
  const prevMonth = () => {
    const newDate = new Date(year, date.getMonth() - 1);
    setDate(newDate);
  };
  const nextMonth = () => {
    const newDate = new Date(year, date.getMonth() + 1);
    setDate(newDate);
  };
  const handleDayClick = () => {};

  useEffect(() => {
    if (onSwipe) {
      onSwipe((test: any) => console.log(test));
    }
  }, [onSwipe]);
  return (
    <div className="carousel">
      <div className="carousel__slides" id="scroller">
        <section className="carousel__slides_slide">
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
        </section>
        <section ref={domRef} className="carousel__slides_slide">
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
        </section>
        <section className="carousel__slides_slide">
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
        </section>
      </div>
    </div>
  );
}

export default Calendar;
