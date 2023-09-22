import React from "react";

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  prevMonth: () => void;
  nextMonth: () => void;
};

function MonthViewBox({ date, setDate, prevMonth, nextMonth }: Props) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return (
    <div className="month_view">
      <button type="button" className="month_view prev_btn" onClick={prevMonth}>
        {"<"}
      </button>
      <strong className="month_view cur_month">{`${year}년 ${month}월`}</strong>
      <button type="button" className="month_view next_btn" onClick={nextMonth}>
        {">"}
      </button>
    </div>
  );
}

export default MonthViewBox;
