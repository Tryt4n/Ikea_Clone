import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NextStep from "./NextStep";

describe("NextStep Modal variant", () => {
  it("should render the NextStep component", () => {
    // Act
    render(<NextStep />);

    expect(screen.getByTestId("modal-next-step")).toBeInTheDocument();
  });
});
