import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { ProductsBtnsControl } from "./ProductsBtnsControl";
import { ReactNode } from "react";
import { ListContextProvider } from "../../../context/ListContext";
import useList from "../../../hooks/useList";
import useApp from "../../../../../hooks/useApp/useApp";
import { initState } from "../../../../../context/AppContext/constants/appInitState";
import { exampleList } from "../../../../../setup-test/test-constants/exampleList";

vi.mock("../../../../../hooks/useApp/useApp");
vi.mock("../../../hooks/useList");

describe("ProductsBtnsControl", () => {
  let managedProducts = [exampleList.products![0], exampleList.products![1]];
  const setManagedProducts = vi.fn(() => {
    managedProducts = [];
  });

  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation(() => {
      return {
        matches: false,
      };
    });

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: {
        ...initState,
        editingList: exampleList,
      },
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: exampleList,
      managedProducts: managedProducts,
      setManagedProducts: setManagedProducts,
    });
  });

  const contextWrapper = (children: ReactNode) => {
    render(<ListContextProvider>{children}</ListContextProvider>);
  };

  it("should render two buttons for managing products and clearing all products", () => {
    // Act
    contextWrapper(<ProductsBtnsControl />);
    const manageBtn = screen.getByText("Zarządzaj");
    const clearBtn = screen.getByText("Wyczyść wszystko");

    // Assert
    expect(manageBtn).toBeInTheDocument();
    expect(clearBtn).toBeInTheDocument();
  });

  it("should open modal on manage button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    contextWrapper(<ProductsBtnsControl />);
    const manageBtn = screen.getByText("Zarządzaj");
    const modal = screen.getByTestId("modal");

    // Assert
    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveClass("show");

    // Act - open modal
    await user.click(manageBtn);

    const modalHeader = screen.queryByRole("heading", {
      level: 2,
      hidden: true,
      name: /zarządzaj swoimi wyborami/i,
    });

    // Assert - modal is open
    expect(modal).toHaveClass("show");
    expect(modal).toHaveClass("side-modal");
    expect(modalHeader).toBeInTheDocument();
  });

  it("should clear managed products list on clear button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    contextWrapper(<ProductsBtnsControl />);

    const clearBtn = screen.getByText("Wyczyść wszystko");

    await user.click(clearBtn);

    // Assert
    expect(setManagedProducts).toHaveBeenCalledWith([]);
    expect(managedProducts).toEqual([]);
  });

  it("should clear managed products list when some products are moved to another list", async () => {
    // Arrange
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: {
        ...initState,
        editingList: exampleList,
      },
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      // Pretend that the list has only one product, so that the managed products list is cleared
      listState: { ...exampleList, products: [exampleList.products![0]] },
      managedProducts: managedProducts,
      setManagedProducts: setManagedProducts,
    });

    // Act
    contextWrapper(<ProductsBtnsControl />);

    // Assert
    expect(setManagedProducts).toHaveBeenCalledWith([]);
    expect(managedProducts).toEqual([]);
  });
});
