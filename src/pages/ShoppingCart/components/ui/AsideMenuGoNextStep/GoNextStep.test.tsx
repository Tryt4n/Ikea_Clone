import { render, screen } from "../../../../../setup-test/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { GoNextStep } from "./GoNextStep";
import useModal from "../../../../../hooks/useModal/useModal";

vi.mock("../../../../../hooks/useModal/useModal");

describe("ShoppingCart aside menu GoNextStep", () => {
  const setModalData = vi.fn();

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it("should render GoNextStep button", async () => {
    // Arrange
    window.innerWidth = 900;

    const user = userEvent.setup();

    // Act
    render(<GoNextStep />);

    const button = screen.getByRole("button", { name: /dalej/i });
    const svg = document.querySelector("svg");

    // Assert
    expect(svg).toBeInTheDocument();
    expect(button.children).toHaveLength(2);

    // Act - click on the button
    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "next-step" });
  });

  it("should not render svg if window width is less than 900px", () => {
    // Arrange
    window.innerWidth = 899;

    // Act
    render(<GoNextStep />);

    const button = screen.getByRole("button", { name: /dalej/i });

    // Assert
    expect(button.children).toHaveLength(1);
  });
});
