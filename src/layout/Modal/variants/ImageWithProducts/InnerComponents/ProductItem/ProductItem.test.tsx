import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import useApp from "../../../../../../hooks/useApp/useApp";
import useModal from "../../../../../../hooks/useModal/useModal";
import useToast from "../../../../../../hooks/useToast/useToast";
import { ProductItem } from "./ProductItem";
import { initState } from "../../../../../../context/AppContext/constants/appInitState";
import { exampleProducts } from "../../../../../../setup-test/test-constants/exampleProducts";
import type { extendedProductType } from "../../ImageWithProducts";
import type { ShoppingCartType } from "../../../../../../context/AppContext/types/ShoppingCartType";
import type { FavouritesListType } from "../../../../../../context/AppContext/types/FavouritesListType";
import { exampleList } from "../../../../../../setup-test/test-constants/exampleList";

vi.mock("../../../../../../hooks/useApp/useApp");
vi.mock("../../../../../../hooks/useModal/useModal");
vi.mock("../../../../../../hooks/useToast/useToast");

describe("ImageWithProducts ProductItem component", () => {
  const state = initState;
  const dispatch = vi.fn();
  const closeModal = vi.fn();
  const setToastData = vi.fn();

  const product: extendedProductType = {
    ...exampleProducts[1],
    imgSrc: "https://example.com/image.jpg",
    imgHoverSrc: "https://example.com/image-hover.jpg",
    rating: {
      rate: 4.5,
      quantity: 20,
    },
  };

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

  it("should render a component", () => {
    // Act
    render(<ProductItem product={product} fetchedData={vi.fn()} />);

    // Assert
    expect(screen.getByText(/nowa niższa cena/i)).toBeInTheDocument();
    expect(
      screen.getByText(/najniższa cena z 30 dni przed obniżką/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/liczba ocen/i)).toBeInTheDocument();
  });

  it("should call addToShoppingCart function when the add to shopping cart button is clicked", async () => {
    // Arrange
    const fetchedData = vi.fn(() =>
      Promise.resolve(product as unknown as ShoppingCartType),
    );

    const user = userEvent.setup();

    // Act
    render(<ProductItem product={product} fetchedData={fetchedData} />);

    const button = screen.getByRole("button", {
      name: /dodaj produkt do koszyka/i,
    });

    await user.click(button);

    // Assert
    expect(fetchedData).toHaveBeenCalledOnce();
    expect(fetchedData).toHaveBeenCalledWith(product.productLink);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "addToShoppingCart",
      payload: [fetchedData.mock.results[0].value],
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${fetchedData.mock.results[0].value.collection} dodano do koszyka.`,
      link: "/shoppingcart",
    });
  });

  it("should call addToShoppingList function when the add to wishlist button is clicked and favouriteLists does not have any lists", async () => {
    // Arrange
    const favouriteLists: FavouritesListType[] = [];

    const state = {
      ...initState,
      favouriteLists: favouriteLists,
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    const fetchedData = vi.fn(() =>
      Promise.resolve(product as unknown as ShoppingCartType),
    );

    const user = userEvent.setup();

    // Act
    render(<ProductItem product={product} fetchedData={fetchedData} />);

    const button = screen.getByRole("button", {
      name: /dodaj do ulubionych/i,
    });

    await user.click(button);

    // Assert
    expect(fetchedData).toHaveBeenCalledOnce();
    expect(fetchedData).toHaveBeenCalledWith(product.productLink);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "addProductsToList",
      payload: {
        products: [fetchedData.mock.results[0].value],
        listId: expect.any(String),
      },
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${fetchedData.mock.results[0].value.collection} został zapisany na liście Moja lista.`,
      link: expect.stringContaining("/favourites/"),
    });
  });

  it("should call addToShoppingList function when the add to wishlist button is clicked and favouriteLists is not empty", async () => {
    // Arrange
    const favouriteLists = [exampleList];

    const state = {
      ...initState,
      favouriteLists: favouriteLists,
    };

    const modalData = {
      type: "some-modal-type",
    };
    const setModalData = vi.fn();

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
    });

    const fetchedData = vi.fn(() =>
      Promise.resolve(product as unknown as ShoppingCartType),
    );

    const user = userEvent.setup();

    // Act
    render(<ProductItem product={product} fetchedData={fetchedData} />);

    const button = screen.getByRole("button", {
      name: /dodaj do ulubionych/i,
    });

    await user.click(button);

    // Assert
    expect(fetchedData).toHaveBeenCalledOnce();
    expect(fetchedData).toHaveBeenCalledWith(product.productLink);

    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "select-list",
      product: fetchedData.mock.results[0].value,
      previousModal: modalData,
    });
  });
});
