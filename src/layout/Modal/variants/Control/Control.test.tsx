import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Control from "./Control";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import useToast from "../../../../hooks/useToast/useToast";
import { initState } from "../../../../context/AppContext/constants/appInitState";
import { shoppingCart } from "../../../../setup-test/test-constants/shoppingCart";
import { exampleList } from "../../../../setup-test/test-constants/exampleList";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../../../hooks/useToast/useToast");

describe("Modal Control variant", () => {
  const state = initState;
  const dispatch = vi.fn();
  const modalData = {};
  const setModalData = vi.fn();
  const closeModal = vi.fn();
  const setToastData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
      closeModal: closeModal,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });
  });

  describe("CartControl", () => {
    it("should render a control component with CartControl", () => {
      // Act
      render(<Control type="shopping-cart-control" />);

      const list = screen.getByRole("list");

      // Assert
      expect(list).toBeInTheDocument();
      expect(list.children).toHaveLength(1);
    });

    it("should render a control component with CartControl if there are products in shopping cart", () => {
      // Arrange
      const state = {
        ...initState,
        shoppingCart: shoppingCart,
      };

      (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        state: state,
        dispatch: dispatch,
      });

      // Act
      render(<Control type="shopping-cart-control" />);

      // Assert
      expect(screen.getByText(/dodaj produkt/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          `Dodaj (${shoppingCart.length}) produktów do listy zakupowej`,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText(/usuń wszystkie/i)).toBeInTheDocument();
      expect(screen.getByText(/udostępnij/i)).toBeInTheDocument();
    });

    it("should call openAddProductByNumberModal function", async () => {
      // Arrange
      const user = userEvent.setup();

      // Act
      render(<Control type="shopping-cart-control" />);

      const button = screen.getByRole("button", { name: /dodaj produkt/i });

      await user.click(button);

      // Assert
      expect(setModalData).toHaveBeenCalledOnce();
      expect(setModalData).toHaveBeenCalledWith({
        type: "add-product-by-number",
      });
    });

    it("should call moveAllProductsToList function", async () => {
      // Arrange
      const state = {
        ...initState,
        shoppingCart: shoppingCart,
      };

      (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        state: state,
        dispatch: dispatch,
      });
      const user = userEvent.setup();

      // Act
      render(<Control type="shopping-cart-control" />);

      const button = screen.getByText(
        `Dodaj (${shoppingCart.length}) produktów do listy zakupowej`,
      );

      await user.click(button);

      // Assert
      expect(setModalData).toHaveBeenCalledOnce();
      expect(setModalData).toHaveBeenCalledWith({
        type: "select-list-with-products",
        products: state.shoppingCart,
        previousModal: modalData,
      });
    });

    it("should call clearShoppingCart function", async () => {
      // Arrange
      const state = {
        ...initState,
        shoppingCart: shoppingCart,
      };

      (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        state: state,
        dispatch: dispatch,
      });
      const user = userEvent.setup();

      // Act
      render(<Control type="shopping-cart-control" />);

      const button = screen.getByText(/usuń wszystkie produkty z koszyka/i);

      await user.click(button);

      // Assert
      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith({ type: "clearShoppingCart" });

      // Get the prevState function from the last call to setToastData
      const prevState = setToastData.mock.calls[0][0].prevState;
      // Call the prevState function
      prevState();

      expect(setToastData).toHaveBeenCalledOnce();
      expect(setToastData).toHaveBeenCalledWith({
        open: true,
        text: `Liczba usuniętych artykułów: ${shoppingCart.length}`,
        prevState: prevState,
      });

      expect(closeModal).toHaveBeenCalledOnce();
    });
  });

  describe("ProductControl", () => {
    it("should call addToShoppingList function", async () => {
      // Arrange
      const modalData = { type: "product-control", product: shoppingCart[0] };

      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: modalData,
        setModalData: setModalData,
      });

      const user = userEvent.setup();

      // Act
      render(<Control type="product-control" />);

      const button = screen.getByText(/przenieś do listy zakupów/i);

      await user.click(button);

      // Assert
      expect(setModalData).toHaveBeenCalledOnce();
      expect(setModalData).toHaveBeenCalledWith({
        type: "select-list",
        product: modalData.product,
      });
    });

    it("should call removeProduct function", async () => {
      // Arrange
      const modalData = { type: "product-control", product: shoppingCart[0] };

      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: modalData,
        setModalData: setModalData,
        closeModal: closeModal,
      });

      const user = userEvent.setup();

      // Act
      render(<Control type="product-control" />);

      const button = screen.getByText(/usuń produkt/i);

      await user.click(button);

      // Assert
      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith({
        type: "removeProductFromShoppingCart",
        payload: modalData.product.productNumber,
      });

      // Get the prevState function from the last call to setToastData
      const prevState = setToastData.mock.calls[0][0].prevState;
      // Call the prevState function
      prevState();

      expect(setToastData).toHaveBeenCalledOnce();
      expect(setToastData).toHaveBeenCalledWith({
        open: true,
        text: `${modalData.product.collection} został usunięty z twojego koszyka.`,
        prevState: prevState,
      });

      expect(closeModal).toHaveBeenCalledOnce();
    });
  });

  describe("ListControl", () => {
    it("should render a component", () => {
      // Act
      render(<Control type="list-control" />);

      // Assert
      expect(screen.getByText(/zmień nazwę listy/i)).toBeInTheDocument();
      expect(screen.getByText(/udostępnij/i)).toBeInTheDocument();
      expect(screen.getByText(/usuń swoją listę/i)).toBeInTheDocument();
    });

    it("should render a component with move to other list element", () => {
      // Arrange
      const state = {
        ...initState,
        favouriteLists: [exampleList],
        editingList: exampleList,
      };

      (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        state: state,
        dispatch: dispatch,
      });

      // Act
      render(<Control type="list-control" />);

      // Assert
      expect(screen.getByText(/przenieś do innej listy/i)).toBeInTheDocument();
    });

    it("should render a component with print the list element", () => {
      // Arrange
      const state = {
        ...initState,
        editingList: exampleList,
      };

      (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        state: state,
        dispatch: dispatch,
      });

      Object.defineProperty(window, "location", {
        value: {
          pathname: "/favourites/52759559-c5f4-4a82-813b-f073aa7f44d3",
        },
        writable: true,
      });

      // Act
      render(<Control type="list-control" />);

      // Assert
      expect(screen.getByText(/drukuj listę zakupów/i)).toBeInTheDocument();
    });

    it("should call openChangeListNameModal function", async () => {
      // Arrange
      const user = userEvent.setup();

      // Act
      render(<Control type="list-control" />);

      const button = screen.getByText(/zmień nazwę listy/i);

      await user.click(button);

      // Assert
      expect(setModalData).toHaveBeenCalledOnce();
      expect(setModalData).toHaveBeenCalledWith({ type: "change-list-name" });
    });

    it("should call openDeleteListModal function", async () => {
      // Arrange
      const user = userEvent.setup();

      // Act
      render(<Control type="list-control" />);

      const button = screen.getByText(/usuń swoją listę/i);

      await user.click(button);

      // Assert
      expect(setModalData).toHaveBeenCalledOnce();
      expect(setModalData).toHaveBeenCalledWith({
        type: "delete-list-confirmation",
      });
    });

    it("should call openMoveToOtherListModal function", async () => {
      // Arrange
      const state = {
        ...initState,
        favouriteLists: [exampleList],
        editingList: exampleList,
      };

      (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        state: state,
        dispatch: dispatch,
      });

      const user = userEvent.setup();

      // Act
      render(<Control type="list-control" />);

      const button = screen.getByText(/przenieś do innej listy/i);

      await user.click(button);

      // Assert
      expect(setModalData).toHaveBeenCalledOnce();
      expect(setModalData).toHaveBeenCalledWith({
        type: "move-to-other-list",
        list: state.editingList,
      });
    });
  });

  describe("ProductInListControl", () => {
    it("should render a component", () => {
      // Act
      render(<Control type="more-options-for-product-in-list" />);

      // Assert
      expect(screen.getByText(/przenieś do innej listy/i)).toBeInTheDocument();
      expect(screen.getByText(/usuń z listy/i)).toBeInTheDocument();
    });

    it("should render a component with similar product element", () => {
      // Arrange
      const modalData = {
        type: "more-options-for-product-in-list",
        products: shoppingCart,
      };

      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: modalData,
      });

      // Act
      render(<Control type="more-options-for-product-in-list" />);

      // Assert
      expect(
        screen.getByText(
          `Produkt podobny do ${modalData.products[0].collection}`,
        ),
      ).toBeInTheDocument();
    });

    it("should call moveProductToOtherList function", async () => {
      // Arrange
      const modalData = {
        type: "more-options-for-product-in-list",
        products: shoppingCart,
      };

      const listId = "52759559-c5f4-4a82-813b-f073aa7f44d3";

      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: modalData,
        setModalData: setModalData,
      });

      Object.defineProperty(window, "location", {
        value: {
          pathname: `/favourites/${listId}`,
        },
        writable: true,
      });

      const user = userEvent.setup();

      // Act
      render(<Control type="more-options-for-product-in-list" />);

      const button = screen.getByText(/przenieś do innej listy/i);

      await user.click(button);

      // Assert
      expect(setModalData).toHaveBeenCalledOnce();
      expect(setModalData).toHaveBeenCalledWith({
        type: "move-product-from-one-list-to-another",
        products: [modalData.products[0]],
        originalListId: listId,
      });
    });

    it("should call removeProduct function", async () => {
      // Arrange
      const modalData = {
        type: "more-options-for-product-in-list",
        products: shoppingCart,
      };

      const listId = "52759559-c5f4-4a82-813b-f073aa7f44d3";

      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: modalData,
        closeModal: closeModal,
      });

      Object.defineProperty(window, "location", {
        value: {
          pathname: `/favourites/${listId}`,
        },
        writable: true,
      });

      const user = userEvent.setup();

      // Act
      render(<Control type="more-options-for-product-in-list" />);

      const button = screen.getByText(/usuń z listy/i);

      await user.click(button);

      // Assert
      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith({
        type: "deleteProductsFromList",
        payload: {
          listId: listId,
          productNumbers: [modalData.products[0].productNumber],
        },
      });

      // Get the prevState function from the last call to setToastData
      const prevState = setToastData.mock.calls[0][0].prevState;
      // Call the prevState function
      prevState();

      expect(setToastData).toHaveBeenCalledOnce();
      expect(setToastData).toHaveBeenCalledWith({
        open: true,
        text: `Usunięto ${modalData.products[0].collection} z twojej listy.`,
        prevState: prevState,
      });

      expect(closeModal).toHaveBeenCalledOnce();
    });
  });
});
