import Divider from "./components/Divider";
import Week from "./components/Week";

function Calendar() {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
 
  return (
    <div data-testid="calendar-container" className="calendar-container">
      <Week daysOfWeek={daysOfWeek} />
      <Divider />
    </div>
  );
}

export default Calendar;
