import { DayType } from "../types";

type Props = {
  days: DayType[];
  handleDayClick: () => void;
};

function Days({ days }: Props) {
  return (
    <div className="calendar__days-box">
      {days.map(({ day, isCurrentMonth, isWeekend, weekendType }, index) => {
        let classNames;
        if (!isCurrentMonth) {
          classNames = `calendar-day day-disable`;
        } else if (isWeekend) {
          classNames = `calendar-day day-weekend__${
            weekendType === "토"
              ? "saturday"
              : weekendType === "일"
              ? "sunday"
              : ""
          }`;
        } else {
          classNames = "calendar-day";
        }
        return (
          <button type="button" key={index} className={classNames}>
            {day}
          </button>
        );
      })}
    </div>
  );
}

export default Days;
