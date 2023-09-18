import React from "react";
import { classes } from "../lib/utils";

type Props = {
  days: {
    day: number;
    isCurrentMonth: boolean;
    isWeekend: boolean;
    weekendType: "일" | "토" | "평일";
  }[];
};

function Days({ days }: Props) {
  return (
    <div className="calendar__days-box">
      {days.map(({ day, isCurrentMonth, isWeekend, weekendType }, index) => {
        const classNames = classes(
          !isCurrentMonth ? "disable" : "",
          isWeekend ? "weekend" : "",
          weekendType === "토"
            ? "saturday"
            : weekendType === "일"
            ? "sunday"
            : ""
        );
        return (
          <div key={index} className={`calendar-day ${classNames}`}>
            {day}
          </div>
        );
      })}
    </div>
  );
}

export default Days;
