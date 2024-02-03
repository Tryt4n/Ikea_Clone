import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { initState } from "../../../../context/AppContext/constants/appInitState";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import useToast from "../../../../hooks/useToast/useToast";
import SelectList from "./SelectList";
import { exampleList } from "../../../../setup-test/test-constants/exampleList";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../../../hooks/useToast/useToast");

describe("SelectList Modal variant", () => {
  const state = initState;
  const setModalData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });
  });

  it("should render a component", () => {
    // Arrange
    const modalData = {
      type: "select-list",
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
    });

    // Act
    render(<SelectList />);

    const container = screen.getByTestId("select-list-modal");
    const button = screen.getByRole("button");

    // Assert
    expect(container.tagName).toBe("DIV");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/stwórz listę/i);
  });

  it(`should render a component for "move-to-other-list" type`, () => {
    // Arrange
    const modalData = {
      type: "move-to-other-list",
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
    });

    // Act
    render(<SelectList />);

    const button = screen.getByRole("button");
    const informationText = screen.getByText(
      /wybierz listę, na którą chcesz przenieść te produkty/i,
    );

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/utwórz nową listę/i);

    expect(informationText).toBeInTheDocument();
  });

  it(`should render a component for "move-product-from-one-list-to-another" type`, () => {
    // Arrange
    const modalData = {
      type: "move-product-from-one-list-to-another",
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
    });

    // Act
    render(<SelectList />);

    const button = screen.getByRole("button");
    const informationText = screen.getByText(
      /wybierz listę, na którą chcesz przenieść ten produkt/i,
    );

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/stwórz listę/i);

    expect(informationText).toBeInTheDocument();
  });

  it(`should render a component for "select-list-with-products" type`, () => {
    // Arrange
    const modalData = {
      type: "select-list-with-products",
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
    });

    // Act
    render(<SelectList />);

    const button = screen.getByRole("button");
    const informationText = screen.getByText(
      /wybierz listę, na którą chcesz przenieść te produkty/i,
    );

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/stwórz listę/i);

    expect(informationText).toBeInTheDocument();
  });

  it("should render a component if favouriteLists exist", () => {
    // Arrange
    const state = {
      ...initState,
      favouriteLists: [exampleList],
    };
    const modalData = {
      type: "select-list",
      product: exampleList.products![0],
    };

    const setToastData = vi.fn();

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });

    // Act
    render(<SelectList />);

    // Assert
    const list = screen.getByRole("list");

    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(state.favouriteLists.length);
  });

  it(`should call createNewList function when the button is clicked in "select-list" type`, async () => {
    // Arrange
    const modalData = {
      type: "select-list",
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
    });

    const user = userEvent.setup();

    // Act
    render(<SelectList />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "create-list",
      product: modalData.product,
    });
  });

  it(`should call createNewList function when the button is clicked in "move-to-other-list" type`, async () => {
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
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
    });

    const user = userEvent.setup();

    // Act
    render(<SelectList />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "create-list-with-products",
      products: state.editingList.products,
    });
  });

  it(`should not call createNewList function when the button is clicked in "move-to-other-list" type and editing list does not exist`, async () => {
    // Arrange
    const modalData = {
      type: "move-to-other-list",
      list: exampleList,
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
    });

    const user = userEvent.setup();

    // Act
    render(<SelectList />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).not.toHaveBeenCalled();
  });

  it(`should call createNewList function when the button is clicked in "move-product-from-one-list-to-another" type`, async () => {
    // Arrange
    const modalData = {
      type: "move-product-from-one-list-to-another",
      products: exampleList.products,
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
    });

    const user = userEvent.setup();

    // Act
    render(<SelectList />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "create-list-with-products",
      products: modalData.products,
    });
  });

  it(`should call createNewList function when the button is clicked in "select-list-with-products" type`, async () => {
    // Arrange
    const modalData = {
      type: "select-list-with-products",
      products: exampleList.products,
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      setModalData: setModalData,
    });

    const user = userEvent.setup();

    // Act
    render(<SelectList />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "create-list-with-products",
      products: modalData.products,
    });
  });

  it("should render a component with form element if list has product in any of the lists", () => {
    // Arrange
    const state = {
      ...initState,
      favouriteLists: [exampleList],
    };
    const modalData = {
      type: "select-list",
      product: exampleList.products![0],
    };

    const setToastData = vi.fn();

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });

    // Act
    render(<SelectList />);

    // Assert
    const container = screen.getByTestId("select-list-modal");

    expect(container.tagName).toBe("FORM");
  });
});
