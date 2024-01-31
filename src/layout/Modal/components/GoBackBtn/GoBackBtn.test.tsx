import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../../setup-test/test-utils";
import GoBackBtn from "./GoBackBtn";
import useModal from "../../../../hooks/useModal/useModal";
import { shoppingCart } from "../../../../setup-test/test-constants/shoppingCart";

vi.mock("../../../../hooks/useModal/useModal");

describe("Modal GoBackBtn", () => {
  const setModalData = vi.fn();

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it(`should go back on "preffered-shop" type`, async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<GoBackBtn type="preffered-shop" />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "choose-shop" });
  });

  it(`should go back on "add-product-by-number" type`, async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<GoBackBtn type="add-product-by-number" />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "shopping-cart-control",
    });
  });

  it(`should go back on "change-list-name" type`, async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<GoBackBtn type="change-list-name" />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "list-control" });
  });

  it(`should go back on "delete-list-confirmation" type`, async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<GoBackBtn type="delete-list-confirmation" />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "list-control" });
  });

  it(`should go back on "create-list" type`, async () => {
    // Arrange
    const modalData = {
      type: "create-list",
      product: shoppingCart[0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
    });

    const user = userEvent.setup();

    // Act
    render(<GoBackBtn type={"create-list"} />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "select-list",
      product: modalData.product,
    });
  });

  it(`should go back on "select-list" type`, async () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: shoppingCart[0],
      previousModal: { type: "image-with-products" },
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
    });

    const user = userEvent.setup();

    // Act
    render(<GoBackBtn type={"select-list"} />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith(modalData.previousModal);
  });

  it(`should go back on "select-list-with-products" type`, async () => {
    // Arrange
    const modalData = {
      type: "select-list-with-products",
      products: shoppingCart,
      previousModal: { type: "some modal type" },
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
    });

    const user = userEvent.setup();

    // Act
    render(<GoBackBtn type={"select-list-with-products"} />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith(modalData.previousModal);
  });

  it(`should go back on "move-to-other-list" type`, async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<GoBackBtn type="move-to-other-list" />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "list-control" });
  });

  describe(`should go back on "move-product-from-one-list-to-another" type`, () => {
    it("if there is only one product", async () => {
      // Arrange
      const modalData = {
        type: "move-product-from-one-list-to-another",
        products: [shoppingCart[0]],
        originalListId: "some list id",
      };

      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: modalData,
        setModalData: setModalData,
      });

      const user = userEvent.setup();

      // Act
      render(<GoBackBtn type={"move-product-from-one-list-to-another"} />);

      const button = screen.getByRole("button");

      await user.click(button);

      // Assert
      expect(setModalData).toHaveBeenCalledOnce();
      expect(setModalData).toHaveBeenCalledWith({
        type: "more-options-for-product-in-list",
        products: modalData.products,
      });
    });

    it("if there is more than one product", async () => {
      // Arrange
      const modalData = {
        type: "move-product-from-one-list-to-another",
        products: shoppingCart,
        originalListId: "some list id",
      };

      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: modalData,
        setModalData: setModalData,
      });

      const user = userEvent.setup();

      // Act
      render(<GoBackBtn type={"move-product-from-one-list-to-another"} />);

      const button = screen.getByRole("button");

      await user.click(button);

      // Assert
      expect(setModalData).toHaveBeenCalledOnce();
      expect(setModalData).toHaveBeenCalledWith({
        type: "manage-products-in-list",
        products: modalData.products,
      });
    });
  });
});
