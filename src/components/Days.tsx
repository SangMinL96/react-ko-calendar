import React from "react";

type Props = {
  days: { day: number; isCurrentMonth: boolean }[];
};

function Days({ days }: Props) {
  return (
    <div className="calendar__days-box">
      {days.map(({ day, isCurrentMonth }, index) => {
        return (
          <div
            key={index}
            className={`calendar-day ${isCurrentMonth ? "" : "empty"}`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}

export default Days;
