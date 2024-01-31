import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { ListCreation } from "./ListCreation";
import useModal from "../../../../hooks/useModal/useModal";

vi.mock("../../../../hooks/useModal/useModal");

describe("ListCreation", () => {
  const setModalData = vi.fn();

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it("should render a component", () => {
    // Act
    render(<ListCreation />);

    const component = screen.getByRole("heading", { level: 3 }).parentElement;

    // Assert
    expect(component).toBeInTheDocument();
  });

  it("should open creation list modal when the button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ListCreation />);
    const button = screen.getByRole("button", { name: "Stwórz listę" });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "create-list" });
  });
});
