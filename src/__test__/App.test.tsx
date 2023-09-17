import { render, screen } from "@testing-library/react";
import App from "../Calendar";
import Week from "../components/Week";
const daysOfWeekMock = ["일", "월", "화", "수", "목", "금", "토"];

describe("캘린더 컨테이너", () => {
  test("렌더 테스트", () => {
    render(<App />);
    const calendar = screen.getByTestId("calendar-container");
    expect(calendar).toBeInTheDocument();
  });
});

describe("요일 컴포넌트", () => {
  test("요일별 렌더 테스트", () => {
    render(<Week daysOfWeek={daysOfWeekMock} />);
    const 월 = screen.getByText("월");
    const 화 = screen.getByText("화");
    const 수 = screen.getByText("수");
    const 목 = screen.getByText("목");
    const 금 = screen.getByText("금");
    const 토 = screen.getByText("토");
    const 일 = screen.getByText("일");
    expect(월).toBeInTheDocument();
    expect(화).toBeInTheDocument();
    expect(수).toBeInTheDocument();
    expect(목).toBeInTheDocument();
    expect(금).toBeInTheDocument();
    expect(토).toBeInTheDocument();
    expect(일).toBeInTheDocument();
  });
});
