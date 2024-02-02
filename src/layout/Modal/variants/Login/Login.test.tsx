import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login Modal component", () => {
  it("should render a component", () => {
    // Arrange
    render(<Login />);

    // Assert
    expect(
      screen.getByRole("button", { name: /zaloguj się/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
