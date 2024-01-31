import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import ControlModalBtns from "./ControlModalBtns";
import useApp from "../../../../../hooks/useApp/useApp";
import useModal from "../../../../../hooks/useModal/useModal";
import useList from "../../../hooks/useList";
import { exampleList } from "../../../../../setup-test/test-constants/exampleList";

vi.mock("../../../../../hooks/useApp/useApp");
vi.mock("../../../../../hooks/useModal/useModal");
vi.mock("../../../hooks/useList");

describe("ControlModalBtns", () => {
  const dispatch = vi.fn();
  const setModalData = vi.fn();
  const listState = exampleList;

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      dispatch: dispatch,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
    });
  });

  it("should render three control buttons", () => {
    // Act
    render(<ControlModalBtns />);
    const buttons = screen.getAllByRole("button");

    // Assert
    expect(buttons.length).toBe(3);
  });

  it("should not open menu list modal when there are no lists", async () => {
    // Arrange
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: undefined,
    });

    const user = userEvent.setup();

    // Act
    render(<ControlModalBtns />);
    const button = screen.getByRole("button", {
      name: /otwórz menu listy/i,
    });

    await user.click(button);

    // Assert
    expect(setModalData).not.toHaveBeenCalled();
  });

  it("should open menu list modal when appropriate button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ControlModalBtns />);
    const button = screen.getByRole("button", {
      name: /otwórz menu listy/i,
    });

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "setEditingList",
      payload: listState,
    });

    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "list-control" });
  });
});
