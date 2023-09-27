type Props = {
  saturdayColor?: string;
  sundayColor?: string;
  daysOfWeek: string[];
};

function Week({
  saturdayColor = "blue",
  sundayColor = "red",
  daysOfWeek = [],
}: Props) {
  return (
    <div className="calendar-container__week_view">
      {daysOfWeek.map((day) => {
        const isWeekend = day === "토" || day === "일";
        const color = day === "토" ? saturdayColor : sundayColor;
        if (isWeekend) {
          return (
            <div
              key={day}
              className={`calendar-container__week_view weekend`}
              style={{ color }}
            >
              <span>{day}</span>
            </div>
          );
        }
        return (
          <div key={day} className="calendar-container__week_view day">
            <span>{day}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Week;
