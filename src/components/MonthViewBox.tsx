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
    <div className="calendar-container__month_view">
      <button type="button" className="calendar-container__month_view__prev_btn" onClick={prevMonth}>
        {"<"}
      </button>
      <strong className="calendar-container__month_view cur_month">{`${year}년 ${month}월`}</strong>
      <button type="button" className="calendar-container__month_view__next_btn" onClick={nextMonth}>
        {">"}
      </button>
      <div className="calendar-container__month_dropbox">
        <button type="button" className="calendar-container__month_dropbox__button active">1월</button>
        <button type="button" className="calendar-container__month_dropbox__button">2월</button>
        <button type="button" className="calendar-container__month_dropbox__button">3월</button>
        <button type="button" className="calendar-container__month_dropbox__button">4월</button>
        <button type="button" className="calendar-container__month_dropbox__button">5월</button>
        <button type="button" className="calendar-container__month_dropbox__button">6월</button>
        <button type="button" className="calendar-container__month_dropbox__button">7월</button>
        <button type="button" className="calendar-container__month_dropbox__button">8월</button>
        <button type="button" className="calendar-container__month_dropbox__button">9월</button>
        <button type="button" className="calendar-container__month_dropbox__button">10월</button>
        <button type="button" className="calendar-container__month_dropbox__button">11월</button>
        <button type="button" className="calendar-container__month_dropbox__button">12월</button>
      </div>
    </div>
  );
}

export default MonthViewBox;
