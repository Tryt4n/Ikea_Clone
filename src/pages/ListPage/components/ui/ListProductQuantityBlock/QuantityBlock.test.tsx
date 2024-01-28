import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { QuantityBlock } from "./QuantityBlock";
import useApp from "../../../../../hooks/useApp/useApp";
import useList from "../../../hooks/useList";

vi.mock("../../../../../hooks/useApp/useApp");
vi.mock("../../../hooks/useList");

describe("ListProductQuantityBlock", () => {
  const dispatch = vi.fn();
  const listId = "listId";

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      dispatch: dispatch,
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listId: listId,
    });
  });

  it("should render a component", () => {
    // Act
    render(<QuantityBlock productNumber="productNumber" quantity={1} />);

    const quantityInputContainer = screen.getByTestId("quantity-input");

    const minusBtn = screen.getByText(/naciśnij aby zmniejszyć ilość/i);
    const plusBtn = screen.getByText(/naciśnij aby zwiększyć ilość/i);
    const input = screen.getByRole("textbox");

    // Assert
    expect(quantityInputContainer).toBeInTheDocument();
    expect(minusBtn).toBeInTheDocument();
    expect(plusBtn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("should change quantity on btn minus click", async () => {
    // Arrange
    const productNumber = "productNumber";

    const user = userEvent.setup();

    // Act
    render(<QuantityBlock productNumber={productNumber} quantity={2} />);

    const minusBtn = screen.getByText(/naciśnij aby zmniejszyć ilość/i);

    // Act
    await user.click(minusBtn);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "changeProductQuantityOnList",
      payload: {
        listId: listId,
        value: "subtract",
        productNumber: productNumber,
      },
    });
  });

  it("should change quantity on btn plus click", async () => {
    // Arrange
    const productNumber = "productNumber";

    const user = userEvent.setup();

    // Act
    render(<QuantityBlock productNumber={productNumber} quantity={1} />);

    const plusBtn = screen.getByText(/naciśnij aby zwiększyć ilość/i);

    await user.click(plusBtn);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "changeProductQuantityOnList",
      payload: {
        listId: listId,
        value: "add",
        productNumber: productNumber,
      },
    });
  });

  it("should change quantity on input change", async () => {
    // Arrange
    const productNumber = "productNumber";
    const typedValue = "2";

    const user = userEvent.setup();

    // Act
    render(<QuantityBlock productNumber={productNumber} quantity={1} />);

    const input = screen.getByRole("textbox");

    await user.type(input, typedValue);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "changeProductQuantityOnList",
      payload: {
        listId: listId,
        value: Number(typedValue),
        productNumber: productNumber,
      },
    });
  });
});
