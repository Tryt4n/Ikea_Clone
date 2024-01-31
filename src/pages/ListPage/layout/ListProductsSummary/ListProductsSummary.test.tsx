import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import ListProductsSummary from "./ListProductsSummary";
import useList from "../../hooks/useList";
import useApp from "../../../../hooks/useApp/useApp";
import useToast from "../../../../hooks/useToast/useToast";
import { exampleList } from "../../../../setup-test/test-constants/exampleList";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useToast/useToast");
vi.mock("../../hooks/useList");

describe("ListProductsSummary", () => {
  const dispatch = vi.fn();
  const listState = exampleList;
  const setToastData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      dispatch: dispatch,
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });
  });

  it("should render a component", () => {
    // Act
    render(<ListProductsSummary />);

    const section = screen.getByRole("heading", {
      name: /podsumowanie/i,
    }).parentElement;

    // Assert
    expect(section).toBeInTheDocument();
  });

  it("should add products to shopping cart", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ListProductsSummary />);

    const btn = screen.getByRole("button", {
      name: /dodaj wszystko do koszyka/i,
    });

    await user.click(btn);

    // Assert
    const expectedProductsNames = listState.products!.map(
      (product) => product.collection,
    );

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "addToShoppingCart",
      payload: listState.products,
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${expectedProductsNames.join(", ")} dodano do koszyka.`,
      link: "/shoppingcart",
    });
  });

  it("should add product to shopping cart if list has only one product", async () => {
    // Arrange
    const user = userEvent.setup();

    const listState = {
      ...exampleList,
      products: [exampleList.products![0]],
    };

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
    });

    // Act
    render(<ListProductsSummary />);

    const btn = screen.getByRole("button", {
      name: /dodaj wszystko do koszyka/i,
    });

    await user.click(btn);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "addToShoppingCart",
      payload: listState.products,
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${listState.products![0].collection} dodano do koszyka.`,
      link: "/shoppingcart",
    });
  });

  it("should not add products to shopping cart if products array on list is empty", async () => {
    // Arrange
    const user = userEvent.setup();

    const listState = {
      ...exampleList,
      products: [],
    };

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
    });

    // Act
    render(<ListProductsSummary />);
    const btn = screen.getByRole("button", {
      name: /dodaj wszystko do koszyka/i,
    });

    await user.click(btn);

    // Assert
    expect(dispatch).not.toHaveBeenCalled();
    expect(setToastData).not.toHaveBeenCalled();
  });

  it("should not add products to shopping cart if products on list are not defined", async () => {
    // Arrange
    const user = userEvent.setup();

    const listState = {
      ...exampleList,
      products: undefined,
    };

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
    });

    // Act
    render(<ListProductsSummary />);
    const btn = screen.getByRole("button", {
      name: /dodaj wszystko do koszyka/i,
    });

    await user.click(btn);

    // Assert
    expect(dispatch).not.toHaveBeenCalled();
    expect(setToastData).not.toHaveBeenCalled();
  });
});
