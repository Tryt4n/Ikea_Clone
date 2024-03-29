import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../../../setup-test/test-utils";
import { ListDescription } from "./ListDescription";
import { exampleList as list } from "../../../../../setup-test/test-constants/exampleList";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import pl from "date-fns/locale/pl";
import userEvent from "@testing-library/user-event";
import useModal from "../../../../../hooks/useModal/useModal";
import useApp from "../../../../../hooks/useApp/useApp";

vi.mock("../../../../../hooks/useApp/useApp");
vi.mock("../../../../../hooks/useModal/useModal");

describe("ListDescription", () => {
  const dispatch = vi.fn();
  const setModalData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      dispatch: dispatch,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it("should render the list name and last edit time", () => {
    // Act
    render(<ListDescription list={list} isMainList={false} />);

    const headingElement = screen.getByRole("heading", {
      level: 3,
      name: list.name,
    });
    const timeElement = screen.getByText(/Zaktualizowano/);

    // Assert
    expect(headingElement).toBeInTheDocument();

    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveTextContent(
      `Zaktualizowano ${formatDistanceToNow(new Date(list.lastEdit), {
        addSuffix: true,
        locale: pl,
      })}`,
    );
    expect(timeElement).toHaveAttribute("datetime", list.lastEdit.toString());
    expect(timeElement).toHaveClass("favourite-list__time--break-word");
  });

  it("should render a list with isMainList set to true", () => {
    // Act
    render(<ListDescription list={list} isMainList={true} />);

    const timeElement = screen.getByText(/Zaktualizowano/);
    const buttonInactiveElement = screen.getByText(/Zobacz/);
    const buttonControlElement = screen.getByText(/Otwórz menu listy/);

    // Assert
    expect(timeElement).not.toHaveClass("favourite-list__time--break-word");

    expect(buttonInactiveElement).toBeInTheDocument();
    expect(buttonInactiveElement).toHaveAttribute("tabindex", "-1");

    expect(buttonControlElement).toBeInTheDocument();
  });

  it('should render a "Przejdź do listy" button if the list is not the main list and the window width is greater than or equal to 900px', () => {
    // Arrange
    window.innerWidth = 900;

    // Act
    render(<ListDescription list={list} isMainList={false} />);
    const buttonElement = screen.getByRole("button");

    // Assert
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(`Przejdź do listy ${list.name}`);
    expect(buttonElement).toHaveAttribute("tabindex", "-1");
  });

  it(`should not render a "Przejdź do listy" button if the list is not the main list and the window width is less than 900px`, () => {
    // Arrange
    window.innerWidth = 899;

    // Act
    render(<ListDescription list={list} isMainList={false} />);

    // Assert
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should open the list control menu when the menu button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ListDescription list={list} isMainList={true} />);
    const button = screen.getByRole("button", { name: /Otwórz menu listy/ });

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "setEditingList",
      payload: list,
    });

    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "list-control" });
  });
});
