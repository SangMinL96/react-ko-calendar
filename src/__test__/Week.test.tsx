import { render, screen } from "@testing-library/react";
import Week from "../components/Week";

const daysOfWeekMock = ["일", "월", "화", "수", "목", "금", "토"];
test("renders learn react link", () => {
  render(<Week daysOfWeek={daysOfWeekMock}/>);
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
