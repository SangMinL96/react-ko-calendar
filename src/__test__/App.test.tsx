import { render, screen } from "@testing-library/react";
import App from "../Calendar";

test("renders learn react link", () => {
  render(<App />);
  const calendar = screen.getByTestId("calendar-container");
  expect(calendar).toBeInTheDocument();

});
