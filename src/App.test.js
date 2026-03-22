import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./services/dashboardApi", () => ({
  getCounts: jest.fn(() => Promise.resolve({ data: {} })),
  getSeverity: jest.fn(() => Promise.resolve({ data: {} })),
  getTrend: jest.fn(() => Promise.resolve({ data: [] })),
}));

test("renders app shell", () => {
  render(<App />);
  expect(screen.getByText(/BugTracker/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search bugs/i)).toBeInTheDocument();
});
