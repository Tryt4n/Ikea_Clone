import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import BtnsControl from "./BtnsControl";

describe("BtnsControl", () => {
  it("should render two buttons and a container div", () => {
    // Act
    render(
      <BtnsControl>
        <div>Child 1</div>
        <div>Child 2</div>
      </BtnsControl>
    );
    const prevBtn = screen.getByTestId("prev-btn");
    const nextBtn = screen.getByTestId("next-btn");

    // Assert
    expect(prevBtn).toBeInTheDocument();
    expect(prevBtn.className).toMatch(/prev/);
    expect(prevBtn).toHaveAttribute("aria-hidden", "true");
    expect(prevBtn).toBeDisabled();

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn.className).toMatch(/next/);
    expect(nextBtn).toHaveAttribute("aria-hidden", "true");
    expect(nextBtn).toBeDisabled();

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 1")).toBeInTheDocument();
  });
});
