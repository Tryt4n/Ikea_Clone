import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import EmptyList from "./EmptyList";
import useList from "../../hooks/useList";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import { useNavigate } from "react-router-dom";
import { exampleList } from "../../../../setup-test/test-constants/exampleList";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../hooks/useList");
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: vi.fn(),
}));

describe("EmptyList", () => {
  const dispatch = vi.fn();
  const setModalData = vi.fn();
  const listState = exampleList;
  const navigate = vi.fn();

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

    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      navigate,
    );
  });

  it("should render a component", () => {
    // Act
    render(<EmptyList />);

    const emptyList = screen.getByTestId("list-page-empty-list");

    // Assert
    expect(emptyList).toBeInTheDocument();
  });

  it("should open edit modal menu", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<EmptyList />);

    const btn = screen.getByRole("button", { name: /zmień nazwę listy/i });

    await user.click(btn);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "setEditingList",
      payload: listState,
    });

    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "change-list-name" });
  });

  it("should open list control menu", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<EmptyList />);

    const btn = screen.getByRole("button", { name: /otwórz menu listy/i });

    await user.click(btn);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "setEditingList",
      payload: listState,
    });

    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "list-control" });
  });

  it("should not open modal when `listState` does not exist", async () => {
    // Arrange
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: undefined,
    });

    const user = userEvent.setup();

    // Act - render the component
    render(<EmptyList />);

    const btnListEdit = screen.getByRole("button", {
      name: /zmień nazwę listy/i,
    });
    const btnListMenu = screen.getByRole("button", {
      name: /otwórz menu listy/i,
    });

    // Act - click the first button
    await user.click(btnListEdit);

    // Assert
    expect(dispatch).not.toHaveBeenCalled();
    expect(setModalData).not.toHaveBeenCalled();

    // Act - click the second button
    await user.click(btnListMenu);

    // Assert
    expect(dispatch).not.toHaveBeenCalled();
    expect(setModalData).not.toHaveBeenCalled();
  });

  it("should navigate to the home page", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<EmptyList />);

    const link = screen.getByText(/odkrywaj więcej/i);

    await user.click(link);

    // Assert
    expect(navigate).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
