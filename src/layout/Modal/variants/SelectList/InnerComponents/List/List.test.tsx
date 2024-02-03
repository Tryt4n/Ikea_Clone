import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { List } from "./List";
import useApp from "../../../../../../hooks/useApp/useApp";
import useModal from "../../../../../../hooks/useModal/useModal";
import useToast from "../../../../../../hooks/useToast/useToast";
import { exampleList } from "../../../../../../setup-test/test-constants/exampleList";
import { initState } from "../../../../../../context/AppContext/constants/appInitState";
import { productLink } from "../../../../../../constants/links";
import { shoppingCart } from "../../../../../../setup-test/test-constants/shoppingCart";
import type { FavouritesListType } from "../../../../../../context/AppContext/types/FavouritesListType";

vi.mock("../../../../../../hooks/useApp/useApp");
vi.mock("../../../../../../hooks/useModal/useModal");
vi.mock("../../../../../../hooks/useToast/useToast");

describe("Modal List component in SelectList variant", () => {
  const state = initState;
  const dispatch = vi.fn();
  const closeModal = vi.fn();
  const setToastData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });
  });

  it(`should render a component for "select-list" type`, () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    // Act
    render(<List list={list} />);

    const listItem = screen.getByRole("listitem");
    const image = screen.getByRole("img");
    const heartIcon = screen.getByTestId("heart-icon");

    // Assert
    expect(listItem).toBeInTheDocument();

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `${productLink}/${list.products![0].collection}-${list.products![0].name}-${list.products![0].variant}__${list.products![0].images.main}`,
    );

    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon.children[0]).toHaveAttribute("fill", "transparent");
    expect(heartIcon.children[0]).toHaveAttribute("stroke-width", "2");
  });

  it(`should render a component for "move-to-other-list" type`, () => {
    // Arrange
    const modalData = {
      type: "move-to-other-list",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    // Act
    render(<List list={list} />);

    const listItem = screen.getByRole("listitem");
    const image = screen.getByRole("img");

    // Assert
    expect(listItem).toBeInTheDocument();

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `${productLink}/${list.products![0].collection}-${list.products![0].name}-${list.products![0].variant}__${list.products![0].images.main}`,
    );
  });

  it(`should render a component for "move-product-from-one-list-to-another" type`, () => {
    // Arrange
    const modalData = {
      type: "move-product-from-one-list-to-another",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    // Act
    render(<List list={list} />);

    const listItem = screen.getByRole("listitem");
    const image = screen.getByRole("img");
    const heartIcon = screen.getByTestId("heart-icon");

    // Assert
    expect(listItem).toBeInTheDocument();

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `${productLink}/${list.products![0].collection}-${list.products![0].name}-${list.products![0].variant}__${list.products![0].images.main}`,
    );

    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon.children[0]).toHaveAttribute("fill", "transparent");
    expect(heartIcon.children[0]).toHaveAttribute("stroke-width", "2");
  });

  it(`should render a component for "select-list-with-products" type`, () => {
    // Arrange
    const modalData = {
      type: "select-list-with-products",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    // Act
    render(<List list={list} />);

    const listItem = screen.getByRole("listitem");
    const image = screen.getByRole("img");
    const heartIcon = screen.getByTestId("heart-icon");

    // Assert
    expect(listItem).toBeInTheDocument();

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `${productLink}/${list.products![0].collection}-${list.products![0].name}-${list.products![0].variant}__${list.products![0].images.main}`,
    );

    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon.children[0]).toHaveAttribute("fill", "transparent");
    expect(heartIcon.children[0]).toHaveAttribute("stroke-width", "2");
  });

  it(`should render NoImageIcon for "select-list" type if list does not have any products`, () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = {
      ...exampleList,
      products: [],
    };

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);

    const svg = screen.getByTestId("modal-list-no-image");

    // Assert
    expect(svg).toBeInTheDocument();
  });

  it(`should render NoImageIcon for "move-product-from-one-list-to-another" type if list does not have any products`, () => {
    // Arrange
    const modalData = {
      type: "move-product-from-one-list-to-another",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = {
      ...exampleList,
      products: [],
    };

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);

    const svg = screen.getByTestId("modal-list-no-image");

    // Assert
    expect(svg).toBeInTheDocument();
  });

  it(`should render NoImageIcon for "select-list-with-products" type if list does not have any products`, () => {
    // Arrange
    const modalData = {
      type: "select-list-with-products",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = {
      ...exampleList,
      products: [],
    };

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);

    const svg = screen.getByTestId("modal-list-no-image");

    // Assert
    expect(svg).toBeInTheDocument();
  });

  it(`should render a checkbox input if the product is not in any list for "select-list" type`, () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);
    const checkbox = screen.getByRole("checkbox");

    // Assert
    expect(checkbox).toBeInTheDocument();
  });

  it(`should render a checkbox input if the product is not in any list for "move-product-from-one-list-to-another" type`, () => {
    // Arrange
    const modalData = {
      type: "move-product-from-one-list-to-another",
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);
    const checkbox = screen.getByRole("checkbox");

    // Assert
    expect(checkbox).toBeInTheDocument();
  });

  it(`should render a checkbox input if the product is not in any list for "select-list-with-products" type`, () => {
    // Arrange
    const modalData = {
      type: "select-list-with-products",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);
    const checkbox = screen.getByRole("checkbox");

    // Assert
    expect(checkbox).toBeInTheDocument();
  });

  it("should render a checkbox input if product is in current list", () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText(
      `Naciśnij aby usunąć produkt z listy "${list.name}"`,
    );

    // Assert
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute("tabindex", "-1");

    expect(label).toBeInTheDocument();
  });

  it("should render a checkbox input if product is not in current list", () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: shoppingCart[1],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText(
      `Naciśnij aby dodać produkt do listy "${list.name}"`,
    );

    // Assert
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute("tabindex", "-1");

    expect(label).toBeInTheDocument();
  });

  it(`should call functions on button click in "move-to-other-list" type`, async () => {
    // Arrange
    const state = {
      ...initState,
      editingList: exampleList,
    };

    const modalData = {
      type: "move-to-other-list",
      list: exampleList,
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const product = {
      collection: "Some Other Product",
      images: {
        main: "main.jpg",
        imgHover: "hover.jpg",
        image_1: "image_1.jpg",
        image_2: "image_2.jpg",
        image_3: "image_3.jpg",
        image_4: "image_4.jpg",
        image_5: "image_5.jpg",
      },
      name: "other-product",
      nameToDisplay: "Other Product",
      price: {
        integer: 99,
        decimal: 99,
      },
      productNumber: "254.548.60",
      size: "universal",
      variant: "variant-other-product",
      variantName: "Variant Other Product",
      quantity: 3,
      productLink:
        "/products/Other-Product/other-product/variant-other=product/25454860",
      addedDate: new Date("2021-01-01"),
      rating: {
        rate: 5,
        quantity: 100,
      },
    };
    const listProducts = [exampleList.products![0], product];
    const list: FavouritesListType = {
      id: "some list id",
      lastEdit: new Date("2021-01-01"),
      name: "some list name",
      products: listProducts,
    };

    const user = userEvent.setup();

    // Act
    render(<List list={list} />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "moveProductsFromOneListToAnother",
      payload: {
        products: state.editingList.products!,
        listWhereProductIsMovedID: list.id,
        originalListId: state.editingList.id,
      },
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Pomyślnie przeniesiono produkty z listy ${state.editingList.name} na listę ${list.name}.`,
    });

    expect(closeModal).toHaveBeenCalledOnce();
  });

  it(`should not call functions on button click in "move-to-other-list" type when editing list does not exist`, async () => {
    // Arrange
    const modalData = {
      type: "move-to-other-list",
      list: exampleList,
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const product = {
      collection: "Some Other Product",
      images: {
        main: "main.jpg",
        imgHover: "hover.jpg",
        image_1: "image_1.jpg",
        image_2: "image_2.jpg",
        image_3: "image_3.jpg",
        image_4: "image_4.jpg",
        image_5: "image_5.jpg",
      },
      name: "other-product",
      nameToDisplay: "Other Product",
      price: {
        integer: 99,
        decimal: 99,
      },
      productNumber: "254.548.60",
      size: "universal",
      variant: "variant-other-product",
      variantName: "Variant Other Product",
      quantity: 3,
      productLink:
        "/products/Other-Product/other-product/variant-other=product/25454860",
      addedDate: new Date("2021-01-01"),
      rating: {
        rate: 5,
        quantity: 100,
      },
    };
    const listProducts = [exampleList.products![0], product];
    const list: FavouritesListType = {
      id: "some list id",
      lastEdit: new Date("2021-01-01"),
      name: "some list name",
      products: listProducts,
    };

    const user = userEvent.setup();

    // Act
    render(<List list={list} />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(dispatch).not.toHaveBeenCalled();

    expect(setToastData).not.toHaveBeenCalled();

    expect(closeModal).not.toHaveBeenCalled();
  });

  it(`should not call functions on button click in "move-to-other-list" type when list does not have any products`, async () => {
    // Arrange
    const modalData = {
      type: "move-to-other-list",
      list: exampleList,
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list: FavouritesListType = {
      id: "some list id",
      lastEdit: new Date("2021-01-01"),
      name: "some list name",
      products: [],
    };

    const user = userEvent.setup();

    // Act
    render(<List list={list} />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(dispatch).not.toHaveBeenCalled();

    expect(setToastData).not.toHaveBeenCalled();

    expect(closeModal).not.toHaveBeenCalled();
  });

  it(`should call removeFromList function on checkbox change in "select-list" type if product is already in current list`, async () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    const user = userEvent.setup();

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    // Assert
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: "deleteProductsFromList",
      payload: {
        productNumbers: [modalData.product.productNumber],
        listId: list.id,
      },
    });

    expect(setToastData).toHaveBeenCalled();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${modalData.product.collection} został usunięty z listy ${list.name}`,
      alignLeft: true,
    });
  });

  it(`should call removeFromList function on button click in "select-list" type if product is already in current list`, async () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    const user = userEvent.setup();

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);
    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: "deleteProductsFromList",
      payload: {
        productNumbers: [modalData.product.productNumber],
        listId: list.id,
      },
    });

    expect(setToastData).toHaveBeenCalled();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${modalData.product.collection} został usunięty z listy ${list.name}`,
      alignLeft: true,
    });
  });

  it(`should call addToList function on checkbox change in "select-list" type if product is not in current list`, async () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: shoppingCart[1],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    const user = userEvent.setup();

    // Act
    render(<List list={list} isProductAlreadyInAnyList />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    // Assert
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: "addProductsToList",
      payload: {
        products: [modalData.product],
        listId: list.id,
      },
    });

    expect(setToastData).toHaveBeenCalled();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${modalData.product.collection} został zapisany na liście ${list.name}`,
      link: `/favourites/${list.id}`,
      alignLeft: true,
    });
  });

  it(`should call addToList function on button click in "select-list" type if product is not in current list`, async () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: shoppingCart[1],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    const user = userEvent.setup();

    // Act
    render(<List list={list} />);
    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: "addProductsToList",
      payload: {
        products: [modalData.product],
        listId: list.id,
      },
    });

    expect(setToastData).toHaveBeenCalled();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${modalData.product.collection} został zapisany na liście ${list.name}`,
      link: `/favourites/${list.id}`,
      alignLeft: true,
    });
  });

  it(`should call functions on button click in "move-product-from-one-list-to-another" type with multiple products`, async () => {
    // Arrange
    const modalData = {
      type: "move-product-from-one-list-to-another",
      products: exampleList.products,
      originalListId: "some list id",
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    const user = userEvent.setup();

    // Act
    render(<List list={list} />);
    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "moveProductsFromOneListToAnother",
      payload: {
        products: modalData.products,
        originalListId: modalData.originalListId,
        listWhereProductIsMovedID: list.id,
      },
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Artykuły w ilości: (${modalData.products!.length}) zostały przeniesione na listę ${list.name}.`,
      link: `/favourites/${list.id}`,
    });

    expect(closeModal).toHaveBeenCalledOnce();
  });

  it(`should call functions on button click in "move-product-from-one-list-to-another" type with only one product`, async () => {
    // Arrange
    const modalData = {
      type: "move-product-from-one-list-to-another",
      products: [exampleList.products![0]],
      originalListId: "some list id",
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    const user = userEvent.setup();

    // Act
    render(<List list={list} />);
    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "moveProductsFromOneListToAnother",
      payload: {
        products: modalData.products,
        originalListId: modalData.originalListId,
        listWhereProductIsMovedID: list.id,
      },
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Pomyślnie przeniesiono ${modalData.products![0].collection} na listę ${list.name}.`,
      link: `/favourites/${list.id}`,
    });

    expect(closeModal).toHaveBeenCalledOnce();
  });

  it(`should call functions on button click in "select-list-with-products" type`, async () => {
    // Arrange
    const modalData = {
      type: "select-list-with-products",
      products: exampleList.products,
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const list = exampleList;

    const user = userEvent.setup();

    // Act
    render(<List list={list} />);
    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "addProductsToList",
      payload: {
        products: modalData.products,
        listId: list.id,
      },
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Produkty (${modalData.products!.length}) zostały zapisane na liście ${list.name}.`,
    });

    expect(closeModal).toHaveBeenCalledOnce();
  });
});
