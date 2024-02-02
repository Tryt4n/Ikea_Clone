import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ManageProductsInList from "./ManageProductsInList";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import useToast from "../../../../hooks/useToast/useToast";
import { exampleList } from "../../../../setup-test/test-constants/exampleList";
import { initState } from "../../../../context/AppContext/constants/appInitState";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../../../hooks/useToast/useToast");

describe("ManageProductsInList Modal component", () => {
  const state = {
    ...initState,
    editingList: exampleList,
  };
  const dispatch = vi.fn();
  const modalData = {
    type: "manage-products-in-list",
    products: exampleList.products,
  };
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

  it("should render a component", () => {
    // Act
    render(<ManageProductsInList />);

    const list = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");

    // Assert
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute("tabindex", "0");

    expect(listItems).toHaveLength(exampleList.products!.length);
  });

  it("should call openSelectListModal function on button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ManageProductsInList />);

    const button = screen.getByRole("button", {
      name: /przenieś do innej listy/i,
    });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "move-product-from-one-list-to-another",
      products: modalData.products,
      previousModal: modalData,
      originalListId: state.editingList.id,
    });
  });

  it("should not call openSelectListModal function on button click when editingList does not exist", async () => {
    // Arrange
    const state = initState;

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    const user = userEvent.setup();

    // Act
    render(<ManageProductsInList />);

    const button = screen.getByRole("button", {
      name: /przenieś do innej listy/i,
    });

    await user.click(button);

    expect(setModalData).not.toHaveBeenCalled();
  });

  it("should call deleteProductsFromList function on button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ManageProductsInList />);

    const button = screen.getByRole("button", {
      name: /usuń z listy/i,
    });

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "deleteProductsFromList",
      payload: {
        listId: state.editingList.id,
        productNumbers: [
          ...modalData.products!.map((product) => product.productNumber),
        ],
      },
    });

    // Get the prevState function from the last call to setToastData
    const prevState = setToastData.mock.calls[0][0].prevState;
    // Call the prevState function
    prevState();

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Usunięto (${modalData.products!.length}) artykuły z twojej listy.`,
      prevState: prevState,
    });

    expect(closeModal).toHaveBeenCalledOnce();
  });

  it("should call deleteProductsFromList function with only one product on button click", async () => {
    // Arrange
    const modalData = {
      type: "manage-products-in-list",
      products: [exampleList.products![0]],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
      closeModal: closeModal,
    });

    const user = userEvent.setup();

    // Act
    render(<ManageProductsInList />);

    const button = screen.getByRole("button", {
      name: /usuń z listy/i,
    });

    await user.click(button);

    // Assert
    // Get the prevState function from the last call to setToastData
    const prevState = setToastData.mock.calls[0][0].prevState;
    // Call the prevState function
    prevState();

    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${modalData.products![0].collection} został usunięty z twojej listy.`,
      prevState: prevState,
    });
  });

  it("should not call deleteProductsFromList function on button click when editingList does not exist", async () => {
    // Arrange
    const state = initState;

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    const user = userEvent.setup();

    // Act
    render(<ManageProductsInList />);

    const button = screen.getByRole("button", {
      name: /usuń z listy/i,
    });

    await user.click(button);

    expect(dispatch).not.toHaveBeenCalled();
  });
});
