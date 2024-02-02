import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NameList from "./NameList";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import useToast from "../../../../hooks/useToast/useToast";
import { exampleList } from "../../../../setup-test/test-constants/exampleList";
import { initState } from "../../../../context/AppContext/constants/appInitState";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../../../hooks/useToast/useToast");

describe("NameList Modal component", () => {
  const state = {
    ...initState,
    editingList: exampleList,
  };
  const dispatch = vi.fn();
  const modalData = {
    type: "manage-products-in-list",
    products: exampleList.products,
  };
  const closeModal = vi.fn();
  const setToastData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });
  });

  const currentDate = new Date();
  currentDate.setMilliseconds(0);

  function isSimilarDate(date1: Date, date2: Date): boolean {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return diff <= 5000; // 5 seconds
  }

  it(`should render a component for "create-list" type`, () => {
    // Act
    render(<NameList type="create-list" />);

    const input = screen.getByRole("textbox");
    const errorMessage = screen.queryByRole("alert", { hidden: true });
    const button = screen.getByRole("button");

    // Assert
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("aria-invalid", "false");

    expect(errorMessage).toHaveAttribute("aria-hidden", "true");

    expect(button).toHaveTextContent(/stwórz listę/i);
  });

  it(`should render a component for "create-list-with-products" type`, () => {
    // Act
    render(<NameList type="create-list" />);

    const button = screen.getByRole("button");

    // Assert
    expect(button).toHaveTextContent(/stwórz listę/i);
  });

  it(`should render a component for "change-list-name" type`, () => {
    // Act
    render(<NameList type="change-list-name" />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // Assert
    expect(input).toHaveValue(state.editingList.name);
    expect(button).toHaveTextContent(/zapisz/i);
  });

  it("should change input value on type", async () => {
    // Arrange
    const user = userEvent.setup();

    const typedValue = "test";

    // Act
    render(<NameList type="create-list" />);

    const input = screen.getByRole("textbox");

    await user.type(input, typedValue);

    // Assert
    expect(input).toHaveValue(typedValue);
  });

  it("should show an error message on submit when the list name already exists", async () => {
    // Arrange
    const state = {
      ...initState,
      favouriteLists: [exampleList],
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    const user = userEvent.setup();

    const typedValue = state.favouriteLists[0].name;

    // Act
    render(<NameList type="create-list" />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");
    const errorMessage = screen.queryByRole("alert", { hidden: true });

    await user.type(input, typedValue);
    await user.click(button);

    // Assert
    expect(input).toHaveValue(typedValue);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(errorMessage).toHaveAttribute("aria-hidden", "false");
  });

  it(`should submit a form with a new list for "create-list" type`, async () => {
    // Arrange
    const user = userEvent.setup();

    const typedValue = "test";

    // Act
    render(<NameList type="create-list" />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await user.type(input, typedValue);
    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "createNewList",
      payload: {
        list: {
          id: expect.any(String),
          name: typedValue,
          lastEdit: expect.any(Date),
          products: undefined,
        },
      },
    });

    const dispatchedAction = dispatch.mock.calls[0][0];
    expect(
      isSimilarDate(dispatchedAction.payload.list.lastEdit, currentDate),
    ).toBeTruthy();

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Pomyślnie utworzono listę ${typedValue}.`,
    });

    expect(closeModal).toHaveBeenCalledOnce();
  });

  it(`should submit a form with a new list with products for "create-list" type`, async () => {
    // Arrange
    const type = "create-list";

    const modalData = {
      type: type,
      product: exampleList.products![0],
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const user = userEvent.setup();

    const typedValue = "test";

    // Act
    render(<NameList type={type} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await user.type(input, typedValue);
    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "createNewList",
      payload: {
        list: {
          id: expect.any(String),
          name: typedValue,
          lastEdit: expect.any(Date),
          products: [modalData.product],
        },
      },
    });

    const dispatchedAction = dispatch.mock.calls[0][0];
    expect(
      isSimilarDate(dispatchedAction.payload.list.lastEdit, currentDate),
    ).toBeTruthy();
  });

  it(`should submit a form with a new list with products for "create-list" type`, async () => {
    // Arrange
    const type = "create-list-with-products";

    const modalData = {
      type: type,
      products: exampleList.products,
    };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
      closeModal: closeModal,
    });

    const user = userEvent.setup();

    const typedValue = "test";

    // Act
    render(<NameList type={type} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await user.type(input, typedValue);
    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "createNewList",
      payload: {
        list: {
          id: expect.any(String),
          name: typedValue,
          lastEdit: expect.any(Date),
          products: modalData.products,
        },
        oldListId: state.editingList.id,
      },
    });

    const dispatchedAction = dispatch.mock.calls[0][0];
    expect(
      isSimilarDate(dispatchedAction.payload.list.lastEdit, currentDate),
    ).toBeTruthy();

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Pomyślnie utworzono listę ${typedValue} dla (${modalData.products!.length}) artykułów.`,
    });

    expect(closeModal).toHaveBeenCalledOnce();
  });

  it(`should submit a form with list with changed name for "change-list-name" type`, async () => {
    // Arrange
    const user = userEvent.setup();

    const typedValue = "test";

    // Act
    render(<NameList type="change-list-name" />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await user.type(input, typedValue);
    await user.click(button);

    const expectedListName = `${state.editingList.name}${typedValue}`;

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "changeListName",
      payload: {
        ...state.editingList,
        name: expectedListName,
      },
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Pomyślnie zmieniono nazwę listy na ${expectedListName}.`,
    });
  });
});
