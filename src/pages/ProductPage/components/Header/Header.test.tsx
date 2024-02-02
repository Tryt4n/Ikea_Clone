import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  isSimilarDate,
  render,
  screen,
} from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import useToast from "../../../../hooks/useToast/useToast";
import Header from "./Header";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";
import { initState } from "../../../../context/AppContext/constants/appInitState";
import { exampleList } from "../../../../setup-test/test-constants/exampleList";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../../../hooks/useToast/useToast");

describe("ProductPage Header", () => {
  const state = {
    ...initState,
  };
  const dispatch = vi.fn();
  const setModalData = vi.fn();
  const setToastData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });
  });

  const currentDate = new Date();
  currentDate.setMilliseconds(0);

  const expectedProduct = {
    collection: exampleFetchedProductData.collection,
    images: exampleFetchedProductData.images,
    name: exampleFetchedProductData.name,
    nameToDisplay: exampleFetchedProductData.nameToDisplay,
    price: exampleFetchedProductData.price,
    productNumber: exampleFetchedProductData.productNumber,
    size: exampleFetchedProductData.size,
    variant: exampleFetchedProductData.variant,
    variantName: exampleFetchedProductData.variantName,
    oldPrice: exampleFetchedProductData.oldPriceTag,
    quantity: 1,
    productLink: `/products/${exampleFetchedProductData.collection}/${exampleFetchedProductData.name}/${exampleFetchedProductData.variant}/${exampleFetchedProductData.productNumber.replace(
      /\./g,
      "",
    )}`, // Replace all dots in the `productNumber` with empty strings.
    newTag: exampleFetchedProductData.newTag,
    addedDate: expect.any(Date),
    rating: exampleFetchedProductData.rating,
  };

  it("should add product to list", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<Header data={exampleFetchedProductData} />);

    const button = screen.getByRole("button", { name: /dodaj do ulubionych/i });

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "addProductsToList",
      payload: {
        listId: expect.any(String),
        products: [expectedProduct],
      },
    });
    const dispatchedAction = dispatch.mock.calls[0][0];
    expect(
      isSimilarDate(
        dispatchedAction.payload.products[0].addedDate,
        currentDate,
      ),
    ).toBeTruthy();

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${exampleFetchedProductData.collection} został zapisany na liście Moja lista.`,
      link: expect.stringMatching(/^\/favourites\/.*/),
    });
  });

  it("should open a modal with lists if there are lists", async () => {
    // Arrange
    const state = {
      ...initState,
      favouriteLists: [exampleList],
    };
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });
    const user = userEvent.setup();

    // Act
    render(<Header data={exampleFetchedProductData} />);

    const button = screen.getByRole("button", {
      name: /dodaj do ulubionych/i,
    });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "select-list",
      product: expectedProduct,
    });
  });

  it("should not change svg color if product is not in any wishlist", () => {
    // Act
    render(<Header data={exampleFetchedProductData} />);

    const svg = screen.getByTestId("heart-icon");
    const path = svg.querySelector("path");

    // Assert
    expect(path).toHaveAttribute("fill", "transparent");
    expect(path).toHaveAttribute("stroke-width", "2");
  });

  it("should change HeartIcon color if product is already in any wishlist", async () => {
    // Arrange
    const products = [...exampleList.products!, expectedProduct];

    const state = {
      ...initState,
      favouriteLists: [
        {
          ...exampleList,
          products: products,
        },
      ],
    };
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    // Act
    render(<Header data={exampleFetchedProductData} />);

    const svg = screen.getByTestId("heart-icon");
    const path = svg.querySelector("path");

    // Assert
    expect(path).toHaveAttribute("fill", "#111");
    expect(path).toHaveAttribute("stroke-width", "0");
  });
});
