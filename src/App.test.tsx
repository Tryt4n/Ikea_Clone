import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import App from "./App";

// it("should render the App", () => {
//   render(<App />);
//   screen.debug();
// });
describe("App", () => {
  it("should render the App", () => {
    // ARRANGE
    render(<App />);

    // Expect
    screen.debug();
  });
});
