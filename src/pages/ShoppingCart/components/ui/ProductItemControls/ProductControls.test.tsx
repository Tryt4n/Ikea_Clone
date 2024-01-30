import { render, screen } from "../../../../../setup-test/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ProductControls } from "./ProductControls";
import useApp from "../../../../../hooks/useApp/useApp";
import { shoppingCart } from "../../../../../setup-test/test-constants/shoppingCart";

vi.mock("../../../../../hooks/useApp/useApp");

describe("ShoppingCart ProductControls", () => {
  const product = shoppingCart[0];
  const dispatch = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      dispatch: dispatch,
    });
  });

  it("should change product quantity by -1", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ProductControls quantity={5} product={product} />);

    const btnMinus = screen.getByRole("button", {
      name: /naciśnij aby zmniejszyć ilość/i,
    });

    // Act
    await user.click(btnMinus);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "changeProductQuantity",
      payload: {
        value: "subtract",
        productNumber: product.productNumber,
      },
    });
  });
  it("should change product quantity", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ProductControls quantity={1} product={product} />);

    const btnPlus = screen.getByRole("button", {
      name: /naciśnij aby zwiększyć ilość/i,
    });

    // Act
    await user.click(btnPlus);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "changeProductQuantity",
      payload: {
        value: "add",
        productNumber: product.productNumber,
      },
    });
  });

  it("should change product quantity", async () => {
    // Arrange
    const user = userEvent.setup();

    const typedValue = 10;

    // Act
    render(<ProductControls quantity={1} product={product} />);

    const input = screen.getByRole("textbox");

    // Act
    await user.type(input, `${typedValue}`);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "changeProductQuantity",
      payload: {
        value: typedValue,
        productNumber: product.productNumber,
      },
    });
  });

  it("should render <BtnProductMenu /> if width is less than 460px", () => {
    // Arrange
    window.innerWidth = 459;

    // Act
    render(<ProductControls quantity={1} product={product} />);

    const button = screen.getByRole("button", {
      name: /Otwórz menu produktu/i,
    });

    expect(button).toBeInTheDocument();
  });
});
