import { render, screen } from "../../../../setup-test/test-utils";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import useModal from "../../../../hooks/useModal/useModal";

vi.mock("../../../../hooks/useModal/useModal");

describe("ShoppingCart Header", () => {
  it("should open image preview modal", async () => {
    // Arrange
    const setModalData = vi.fn();

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });

    const user = userEvent.setup();

    // Act
    render(<Header text="some text" />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "shopping-cart-control",
    });
  });
});
