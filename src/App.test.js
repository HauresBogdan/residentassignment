import { render, screen } from "@testing-library/react";
import App from "./App";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("renders header", () => {
  render(<App />);
  const linkElement = screen.getByText(/User Projects/i);
  expect(linkElement).toBeInTheDocument();
});

it("renders without crashing", () => {
  shallow(<App />);
});
