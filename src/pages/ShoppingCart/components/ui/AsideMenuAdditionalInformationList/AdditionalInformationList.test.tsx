import { render, screen } from "../../../../../setup-test/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { AdditionalInformationsList } from "./AdditionalInformationList";
import useModal from "../../../../../hooks/useModal/useModal";

vi.mock("../../../../../hooks/useModal/useModal");

describe("ShoppingCart aside menu AdditionalInformationsList", () => {
  const setModalData = vi.fn();

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it("should open refund modal", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<AdditionalInformationsList />);

    const button = screen.getByRole("button", { name: /365 dni na zwrot/i });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "refund" });
  });

  it("should open data encryption modal", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<AdditionalInformationsList />);

    const button = screen.getByRole("button", { name: /bezpieczne zakupy/i });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "data-encryption" });
  });
});
