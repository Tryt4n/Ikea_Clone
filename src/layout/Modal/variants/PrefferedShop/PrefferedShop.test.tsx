import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import PrefferedShop from "./PrefferedShop";
import { shopsList } from "../../../../constants/shopsList";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");

describe("PrefferedShop Modal variant", () => {
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

  it("should render a component", () => {
    // Act
    render(<PrefferedShop />);

    const input = screen.getByLabelText(/wpisz miasto/i);
    const locationBtn = screen.getByRole("button", {
      name: /użyj obecnej lokalizacji/i,
    });
    const list = screen.getByRole("list");

    // Assert
    expect(input).toBeInTheDocument();

    expect(locationBtn).toBeInTheDocument();

    expect(list).toBeInTheDocument();

    expect(list.children).toHaveLength(shopsList.length);
  });

  it("should call selectShop function when a shop is selected", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<PrefferedShop />);

    const buttons = screen.getAllByTestId("modal-shop-list-item-btn");

    await user.click(buttons[0]);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "chooseShop",
      payload: shopsList[0],
    });

    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "chosen-shop" });
  });

  it("should filter the shops list by the search term", async () => {
    // Arrange
    const user = userEvent.setup();

    const typedTerm = shopsList[0].name;

    // Act
    render(<PrefferedShop />);

    const input = screen.getByLabelText(/wpisz miasto/i);
    const list = screen.getByRole("list");

    await user.type(input, typedTerm);

    // Assert
    expect(input).toHaveValue(typedTerm);

    expect(list.children).toHaveLength(1);
  });

  it("should display not found message if searched term does not meet any shops name", async () => {
    // Arrange
    const user = userEvent.setup();

    const typedTerm = "not existing shop name";

    // Act
    render(<PrefferedShop />);

    const input = screen.getByLabelText(/wpisz miasto/i);

    await user.type(input, typedTerm);

    // Assert
    expect(input).toHaveValue(typedTerm);

    expect(
      screen.getByText(/nie udało nam się znaleźć sklepu/i),
    ).toBeInTheDocument();
  });
});
