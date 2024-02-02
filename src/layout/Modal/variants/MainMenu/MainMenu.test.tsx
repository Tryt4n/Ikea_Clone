import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useModal from "../../../../hooks/useModal/useModal";
import MainMenu from "./MainMenu";
import {
  mainNavigationList,
  mainNavigationSubList,
  secondaryNavigationList,
} from "../../../../constants/navigationLists";

vi.mock("../../../../hooks/useModal/useModal");

describe("MainMenu Modal component", () => {
  const setModalData = vi.fn();

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it("should render a component", () => {
    // Arrange
    const listsLength =
      mainNavigationList.length +
      mainNavigationSubList.length +
      secondaryNavigationList.length;

    // Act
    render(<MainMenu />);

    const navigation = screen.getByRole("navigation");
    const lists = screen.getAllByRole("list");
    const productsBtn = screen.getByRole("button", { name: /produkty/i });
    const roomsBtn = screen.getByRole("button", { name: /pomieszczenia/i });
    const links = screen.getAllByRole("link");

    // Assert
    expect(navigation).toBeInTheDocument();

    expect(lists).toHaveLength(2);

    expect(productsBtn).toBeInTheDocument();
    expect(roomsBtn).toBeInTheDocument();

    expect(links).toHaveLength(listsLength - 2);
  });

  it("should call changeMenu function when product button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<MainMenu />);

    const button = screen.getByRole("button", { name: /produkty/i });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "products-menu" });
  });

  it("should call changeMenu function when rooms button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<MainMenu />);

    const button = screen.getByRole("button", { name: /pomieszczenia/i });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "rooms-menu" });
  });
});
