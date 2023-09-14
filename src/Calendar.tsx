import React from "react";

function App() {
  return (
    <div className="calendar-container">
      <div className="calendar__week-box">
        <div className="calendar-week weekend">
          <span>일</span>
        </div>
        <div className="calendar-week">
          <span>월</span>
        </div>
        <div className="calendar-week">
          <span>화</span>
        </div>
        <div className="calendar-week">
          <span>수</span>
        </div>
        <div className="calendar-week">
          <span>목</span>
        </div>
        <div className="calendar-week">
          <span>금</span>
        </div>
        <div className="calendar-week weekend">
          <span>토</span>
        </div>
      </div>
    </div>
  );
}

export default App;
