import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render the App with all providers", () => {
    // Act
    render(<App />);

    const mainElement = screen.getByRole("main"); // If this element is present, it means that the App component must have been rendered with all providers

    // Assert
    expect(mainElement).toBeInTheDocument();
  });
});
