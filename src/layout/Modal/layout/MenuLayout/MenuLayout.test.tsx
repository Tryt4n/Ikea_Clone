import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import MenuLayout from "./MenuLayout";
import useModal from "../../../../hooks/useModal/useModal";

vi.mock("../../../../hooks/useModal/useModal");

describe("Menu Modal", () => {
  it("should call goBack function when button is clicked", async () => {
    // Arrange
    const setModalData = vi.fn();

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });

    const user = userEvent.setup();

    // Act
    render(<MenuLayout data={{ type: "products-menu" }} />);

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: /wstecz/i });

      await user.click(button);

      // Assert
      expect(setModalData).toHaveBeenCalledOnce();
      expect(setModalData).toHaveBeenCalledWith({ type: "menu" });
    });
  });
});
