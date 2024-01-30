import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { BtnsControl } from "./BtnsControl";
import { exampleList } from "../../../../../setup-test/test-constants/exampleList";
import { ListContextProvider } from "../../../context/ListContext";
import useApp from "../../../../../hooks/useApp/useApp";
import useToast from "../../../../../hooks/useToast/useToast";
import useList from "../../../hooks/useList";
import { initState } from "../../../../../context/AppContext/constants/appInitState";
import type { ReactNode } from "react";
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";

vi.mock("../../../../../hooks/useApp/useApp");
vi.mock("../../../../../hooks/useToast/useToast");
vi.mock("../../../hooks/useList");

describe("ListProductBtnsControl", () => {
  const shoppingCart: ShoppingCartType[] = [];
  const dispatch = vi.fn();
  const setToastData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: {
        ...initState,
        shoppingCart: shoppingCart,
      },
      dispatch: dispatch,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listId: exampleList.id,
    });
  });

  const contextWrapper = (children: ReactNode) => {
    render(<ListContextProvider>{children}</ListContextProvider>);
  };

  it("should render a component", () => {
    // Act
    contextWrapper(<BtnsControl product={exampleList.products![0]} />);

    const buttons = screen.getAllByRole("button");

    // Assert
    expect(buttons).toHaveLength(2);
  });

  it("should add product to shopping list on add button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    contextWrapper(<BtnsControl product={exampleList.products![0]} />);

    const addBtn = screen.getByText(/dodaj do koszyka/i);
    const toastNotification = screen.getByTestId("toast-notification");

    await user.click(addBtn);

    // Assert
    expect(toastNotification).toBeInTheDocument();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "addToShoppingCart",
      payload: [exampleList.products![0]],
    });

    expect(setToastData).toHaveBeenCalledTimes(1);
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${exampleList.products![0].collection} dodano do koszyka.`,
      link: "/shoppingcart",
    });
  });

  it("should remove product from list on delete button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    contextWrapper(<BtnsControl product={exampleList.products![0]} />);

    const deleteBtn = screen.getByText(/usuń produkt z tej listy/i);
    const toastNotification = screen.getByTestId("toast-notification");

    await user.click(deleteBtn);

    // Assert
    expect(toastNotification).toBeInTheDocument();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "deleteProductsFromList",
      payload: {
        listId: exampleList.id,
        productNumbers: [exampleList.products![0].productNumber],
      },
    });

    // Get the prevState function from the last call to setToastData
    const prevState = setToastData.mock.calls[0][0].prevState;

    // Call the prevState function
    prevState();

    // Check that dispatch was called with the correct arguments
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: "restoreList",
      payload: initState.editingList,
    });

    expect(setToastData).toHaveBeenCalledTimes(1);
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Usunięto ${exampleList.products![0].collection} z twojej listy.`,
      prevState: prevState,
    });
  });
});
