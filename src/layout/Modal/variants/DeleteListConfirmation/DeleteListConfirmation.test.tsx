import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";
import useModal from "../../../../hooks/useModal/useModal";
import useApp from "../../../../hooks/useApp/useApp";
import useToast from "../../../../hooks/useToast/useToast";
import DeleteListConfirmation from "./DeleteListConfirmation";
import { initState } from "../../../../context/AppContext/constants/appInitState";
import { exampleList } from "../../../../setup-test/test-constants/exampleList";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../../../hooks/useToast/useToast");

describe("Modal DeleteListConfirmation variant", () => {
  const state = {
    ...initState,
    editingList: exampleList,
  };
  const dispatch = vi.fn();
  const closeModal = vi.fn();
  const setToastData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      closeModal: closeModal,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });
  });

  it("should render a delete list confirmation component", () => {
    // Act
    render(<DeleteListConfirmation />);

    const input = screen.getByRole("checkbox");
    const errorMessage = screen.getByText(
      /potwierdź, że chcesz usunąć tę listę/i,
    );

    // Assert
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute("aria-hidden", "true");
  });

  it("should display error message if form is submitted without checking the checkbox", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<DeleteListConfirmation />);

    const button = screen.getByRole("button", { name: /usuń listę/i });
    const errorMessage = screen.getByText(
      /potwierdź, że chcesz usunąć tę listę/i,
    );

    await user.click(button);

    // Assert
    expect(dispatch).not.toHaveBeenCalled();

    expect(setToastData).not.toHaveBeenCalled();

    expect(closeModal).not.toHaveBeenCalled();

    expect(errorMessage).toHaveAttribute("aria-hidden", "false");
  });

  it("should toggle checkbox checked status on input click", async () => {
    // Act
    render(<DeleteListConfirmation />);

    const input = screen.getByRole("checkbox");

    // Act - check the checkbox
    fireEvent.change(input, { target: { checked: true } });

    // Assert - the checkbox should be checked
    expect(input).toBeChecked();

    // Act - uncheck the checkbox
    fireEvent.change(input, { target: { checked: false } });

    // Assert - the checkbox should be unchecked
    expect(input).not.toBeChecked();
  });

  it("should toggle checkbox checked status on Enter keydown", async () => {
    // Act
    render(<DeleteListConfirmation />);

    const input = screen.getByRole("checkbox");

    // Act - check the checkbox
    fireEvent.keyDown(input, { keyCode: 13 });

    // Assert - the checkbox should be checked
    expect(input).toBeChecked();

    // Act - uncheck the checkbox
    fireEvent.keyDown(input, { keyCode: 13 });

    // Assert - the checkbox should be unchecked
    expect(input).not.toBeChecked();
  });

  it("should toggle checkbox checked status on Space keydown", async () => {
    // Act
    render(<DeleteListConfirmation />);

    const input = screen.getByRole("checkbox");

    // Act - check the checkbox
    fireEvent.keyDown(input, { keyCode: 32 });

    // Assert - the checkbox should be checked
    expect(input).toBeChecked();

    // Act - uncheck the checkbox
    fireEvent.keyDown(input, { keyCode: 32 });

    // Assert - the checkbox should be unchecked
    expect(input).not.toBeChecked();
  });

  it("should toggle checkbox checked status on label click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<DeleteListConfirmation />);

    const input = screen.getByRole("checkbox");
    const label = screen.getByText(
      "Potwierdzam, że chcę usunąć tę listę wraz z jej zawartością",
    );

    // Act - check the checkbox
    await user.click(label);

    // Assert - the checkbox should be checked
    expect(input).toBeChecked();

    // Act - uncheck the checkbox
    await user.click(label);

    // Assert - the checkbox should be unchecked
    expect(input).not.toBeChecked();
  });

  it("should call deleteList function on form submit if checkbox is checked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<DeleteListConfirmation />);

    const button = screen.getByRole("button", { name: /usuń listę/i });
    const label = screen.getByText(
      "Potwierdzam, że chcę usunąć tę listę wraz z jej zawartością",
    );

    // Act - check the checkbox
    await user.click(label);

    // Act - submit the form
    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "deleteList",
      payload: state.editingList.id,
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Pomyślnie usunięto ${state.editingList.name}.`,
    });

    expect(closeModal).toHaveBeenCalledOnce();
  });
});
